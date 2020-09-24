read_environment_file() {
    while IFS='=' read -r KEY VALUE
    do 
        eval "$KEY"='$VALUE'
        echo ${KEY}
        echo ${VALUE}
    done < .env.tmp
}

read_environment_file