#!/bin/bash
sudo apt-get update
sudo apt-get install -y build-essential python 

wget https://nodejs.org/dist/v14.12.0/node-v14.12.0.tar.gz
cd node-v14.12.0
bash configure
make
make install

node -v
npm -v
npm install node-gyp node-pre-gyp

PROTOC_ZIP=protoc-3.7.1-linux-x86_64.zip
curl -OL https://github.com/protocolbuffers/protobuf/releases/download/v3.7.1/$PROTOC_ZIP
sudo apt-get install -y unzip
sudo unzip -o $PROTOC_ZIP -d /usr/local bin/protoc
sudo unzip -o $PROTOC_ZIP -d /usr/local 'include/*'
rm -f $PROTOC_ZIP
sudo apt-get remove -y unzip

cat <<EOF > .env
# Entrypoint HTTP Server
NODE_ENV=development 
ENTRYPOINT_HTTP_PORT=12000

ENTRYPOINT_GRPC_PORT=3333

MONGO_PRIMARY_URI=mongodb://localhost:27017/mydb
MONGO_REPLICA_URI=mongodb://localhost:27017/mydb

KAFKA_HOST=localhost:9092
KAFKA_CONNECT_TIMEOUT=1000
TODO_TOPIC=todo_topic
EOF

