FROM node:14.5.0-alpine

WORKDIR /opt
ENV NODE_ENV=development 
    
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 12000

CMD ["node", "./src/app.js"]
