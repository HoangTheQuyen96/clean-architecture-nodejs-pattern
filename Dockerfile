FROM node:14.10.0-stretch

WORKDIR /opt
ENV NODE_ENV=development 

RUN apt-get update && apt-get install -y build-essential python \
  && npm install node-gyp node-pre-gyp 
  
    
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 12000

CMD ["node", "./src/app.js"]
