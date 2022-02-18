FROM node:14

ADD apps/student-client dist/apps/student-client/

WORKDIR /dist/apps/student-client

EXPOSE 3006

RUN yarn install
RUN yarn add typescript && yarn build
RUN ls . -al

CMD yarn start