dir="third_party"
init:
	if [ -d ${dir} ]; then echo "Directory ${dir} already existed, bypass clone modules and continue to generate!"; \
  else \
    rm -f -r ${dir}; \
	  mkdir ${dir}; \
		cd ${dir}; \
		echo "Cloning modules to ${dir}"; \
		git clone https://github.com/grpc-ecosystem/grpc-gateway; \
		git clone https://github.com/googleapis/googleapis; \
  fi;

swagger:
	rm -f -r generated
	mkdir generated
	protoc -I/usr/local/include -I. \
		-I${GOPATH}/src \
		-I./third_party/googleapis \
		-I./third_party/grpc-gateway \
		--swagger_out=logtostderr=true:generated/ \
		quyen/todo/todo.proto


