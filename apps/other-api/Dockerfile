FROM node:14

ADD . /app

WORKDIR /app

RUN ls /app -al

RUN yarn && yarn build @app/other-api

COPY apps/other-api/package.json dist/apps/other-api/
COPY apps/other-api/tsconfig.build.json dist/apps/other-api/
COPY apps/other-api/tsconfig.json dist/apps/other-api/

EXPOSE 4000

RUN yarn --cwd dist/apps/other-api
RUN yarn --cwd dist/apps/libs/modules
RUN yarn --cwd dist/apps/libs/utils
RUN yarn --cwd dist/apps/libs/core

RUN ls dist/apps/other-api -al

RUN ls /app -al

RUN yarn

CMD yarn --cwd apps start:other:prd