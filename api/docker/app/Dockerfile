FROM node:11

WORKDIR usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# bundle source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]