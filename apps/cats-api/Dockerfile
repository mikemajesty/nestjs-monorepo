FROM node:14

ADD . /app

WORKDIR /app

RUN ls /app -al

RUN yarn && yarn build @app/cats-api

COPY apps/cats-api/package.json dist/apps/cats-api/
COPY apps/cats-api/tsconfig.build.json dist/apps/cats-api/
COPY apps/cats-api/tsconfig.json dist/apps/cats-api/

EXPOSE 3000

RUN yarn --cwd dist/apps/cats-api
RUN yarn --cwd dist/apps/libs/modules
RUN yarn --cwd dist/apps/libs/utils
RUN yarn --cwd dist/apps/libs/core

RUN ls dist/apps/cats-api -al

RUN ls /app -al

RUN yarn

CMD yarn --cwd app start:cats-api:prd