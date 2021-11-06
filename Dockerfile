FROM node:14

ADD . /app

RUN ls /app -al

WORKDIR /app

RUN yarn && yarn build:all

RUN ls dist/apps/main-api -al

EXPOSE 3000

CMD [ "yarn", "start:prod"]