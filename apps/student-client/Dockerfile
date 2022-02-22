FROM node:14

COPY .env dist/
COPY package.json dist/

RUN ls dist -al

RUN yarn --cwd dist/ install

ADD apps/student-client dist/apps/student-client/

RUN ls dist -al

WORKDIR /dist/apps/student-client

EXPOSE 3006

RUN npm i
RUN npm i typescript
RUN npm i react-scripts
RUN yarn build
RUN ls . -al

CMD yarn start