FROM node:8-stretch

# create app directory
WORKDIR /usr/src/app

# install dependencies
COPY package*.json ./

RUN npm install
# for production use:
# RUN npm ci --only=production

# bundle src
COPY . .

EXPOSE 808

CMD ["npm", "start"]
