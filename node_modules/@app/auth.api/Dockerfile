FROM node:14

ADD . /app

WORKDIR /app

RUN ls /app -al

RUN yarn && yarn build @app/auth-api

COPY apps/auth-api/package.json dist/apps/auth-api/
COPY apps/auth-api/tsconfig.build.json dist/apps/auth-api/
COPY apps/auth-api/tsconfig.json dist/apps/auth-api/

EXPOSE 4000

RUN yarn --cwd dist/apps/auth-api
RUN yarn --cwd dist/apps/libs/modules
RUN yarn --cwd dist/apps/libs/utils
RUN yarn --cwd dist/apps/libs/core

RUN ls dist/apps/auth-api -al

RUN ls /app -al

RUN yarn

CMD yarn --cwd apps start:auth-api:prd