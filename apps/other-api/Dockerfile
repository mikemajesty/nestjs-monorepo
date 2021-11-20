FROM node:14

ADD . /app

WORKDIR /app

RUN ls /app -al

RUN yarn && yarn build @app/other-api

COPY apps/other-api/package.json dist/apps/other-api/
COPY apps/other-api/tsconfig.build.json dist/apps/other-api/
COPY apps/other-api/tsconfig.json dist/apps/other-api/

COPY apps/libs/package.json dist/apps/libs/
COPY apps/libs/tsconfig.json dist/apps/libs/

EXPOSE 4000

RUN yarn --cwd dist/apps/other-api
RUN yarn --cwd dist/apps/libs

RUN ls dist/apps/other-api -al
RUN ls dist/apps/libs -al

RUN ls /app -al

RUN yarn

CMD yarn --cwd apps start:other-api:prd