#!/bin/bash
SUPPORTED_OSTYPES_LIST=( UBUNTU_16_18_20 UNSUPPORTED )

tam=${#SUPPORTED_OSTYPES_LIST[@]}
for ((i=0; i < $tam; i++)); do
    name=${SUPPORTED_OSTYPES_LIST[i]}
    declare -r ${name}=$i
done


#determine the OS TYPE
determine_os_type() {
    OSNAME=$(lsb_release -d | grep -o "Ubuntu")
    echo .................... CURRENT OS IS ${OSNAME} .....................
    if [ "X$OSNAME" != "X" ]; then
        UBUNTU_VER=$(lsb_release -d | grep -o '.[0-9]*\.'| head -1|sed -e 's/\s*//'|sed -e 's/\.//')
        if [ $UBUNTU_VER = 16 ] || [ $UBUNTU_VER = 18 ] || [ $UBUNTU_VER = 20 ]; then
            echo .................... UBUNTU VERSION IS: ${UBUNTU_VER} ...................
            OS_TYPE=${SUPPORTED_OSTYPES_LIST[$UBUNTU_16_18_20]}
        else 
            OS_TYPE=${SUPPORTED_OSTYPES_LIST[$UNSUPPORTED]}
        fi
    else
        if [ -f /etc/debian_version ]; then
            DEBIAN_MAJOR_VERSION=$(cat /etc/debian_version | grep -o '[0-9]'| head -1|sed -e 's/ //')
            if [ $DEBIAN_MAJOR_VERSION = 8 ] || [ $DEBIAN_MAJOR_VERSION = 9 ]; then 
                OS_TYPE=${SUPPORTED_OSTYPES_LIST[$DEBIAN_8_9]}
            else
                OS_TYPE=${SUPPORTED_OSTYPES_LIST[$UNSUPPORTED]}
            fi
        else
            OS_TYPE=${SUPPORTED_OSTYPES_LIST[$UNSUPPORTED]}
        fi
    fi
}

check_os_supported() {
    determine_os_type
    echo "Check OS Supported..." | tee -a ./install.log
    if [ $OS_TYPE = ${SUPPORTED_OSTYPES_LIST[$UNSUPPORTED]} ]; then
    echo "OS Unsupported" | tee -a ./install.log
    exit 1;
    return
    fi
    if [ $OS_TYPE = ${SUPPORTED_OSTYPES_LIST[$UBUNTU_16_18_20]} ]; then
        DPKG_DIST=1
    fi
}
install_plugin() {
    check_os_supported 
    sudo -v > /dev/null 2>/dev/null
        if [ $? -eq 0 ]; then
            echo "sudo password : "
            sudo apt-get update | tee -a ./install.log
            sudo apt-get install apt-transport-https ca-certificates wget curl gnupg-agent software-properties-common -y | tee -a ./install.log
        else
            echo "super user password : "
        fi
}

# check and install docker if not exist!
check_install_docker() {
    # Verify that we can at least get version output
    if [ ! -e /usr/bin/docker ]; then
        echo "The docker installing..."
        if [ $DPKG_DIST -eq 1 ]; then
            local _OS_NAME="$(lsb_release -cs)"
            if [[ ${_OS_NAME} == "focal" ]]; then
                $_OS_NAME = "bionic" # pass in ubuntu 20.04
            fi
            sudo -v > /dev/null 2>/dev/null
            if [ $? -eq 0 ]; then
                echo "sudo password : "
                curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - | tee -a ./install.log
                sudo apt-key fingerprint 0EBFCD88 | tee -a ./install.log
                sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu ${_OS_NAME} stable" | tee -a ./install.log
                sudo apt-get update | tee -a ./install.log
                sudo apt-get install docker-ce docker-ce-cli containerd.io -y | tee -a ./install.log
            else
                echo "super user password : "
                su -c "apt-get update"
            fi
        fi
        # config
        sudo usermod -aG docker $(whoami) | tee -a ./install.log
        sudo systemctl enable docker | tee -a ./install.log
        sudo service docker start | tee -a ./install.log
        echo "Docker installed!!!" | tee -a ./install.log
    else
        echo "Ignore install docker" | tee -a ./install.log
    fi
}

# check and install docker-compose if not exist!
check_install_docker_compose() {
    # Verify that we can at least get version output
    echo "Check docker-compose..."
    if [ ! -e /usr/bin/docker-compose ] ; then
        echo "Installing it..."
        echo "Please, check latest version: https://github.com/docker/compose/releases"
        sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        if [ $? -ne 0 ]; then
            echo "Failed to download docker-compose"
        else
            sudo chmod +x /usr/local/bin/docker-compose | tee -a ./install.log
            sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose | tee -a ./install.log
            echo "Please run: docker-compose --version to check"
        fi
    else
        echo "Ignore install docker-compose" | tee -a ./install.log
    fi
}

read_environment_file() {
    while IFS='=' read -r KEY VALUE
    do 
        eval "ENV_$KEY"='$VALUE'
    done < .env.tmp
}

append_zookeeper_kafka_mongo_to_docker_compose() {
    read_environment_file
    echo "Generate docker-compose.yml..."
    cp docker-compose.tmp docker-compose.yml | tee -a install.log
    cat prepare_env.yml >> docker-compose.yml
}

prepare_docker_compose_all() {
   check_install_docker
   check_install_docker_compose
   append_zookeeper_kafka_mongo_to_docker_compose
   sudo -v > /dev/null 2>/dev/null

   sudo docker-compose build | tee -a install.log
   sudo docker-compose up -d | tee -a install.log
}

install_plugin
prepare_docker_compose_all