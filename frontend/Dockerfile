FROM node:8

# create app directory
WORKDIR /app

RUN yarn create react-app todo-app

WORKDIR /app/todo-app

EXPOSE 3000

ENTRYPOINT ["yarn"]
CMD ["start"]

# install dependencies
COPY package.json /app/todo-app/package.json
ARG PRODUCTION

RUN yarn install --production='false'

# bundle src
COPY public/ /app/todo-app/public
COPY src/ /app/todo-app/src
