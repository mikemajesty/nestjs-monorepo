FROM node:14

ADD . /app

WORKDIR /app

RUN ls /app -al

RUN yarn && yarn build @app/main-api

COPY apps/main-api/package.json dist/apps/main-api/
COPY apps/main-api/tsconfig.build.json dist/apps/main-api/
COPY apps/main-api/tsconfig.json dist/apps/main-api/

COPY libs/package.json dist/apps/libs/
COPY libs/tsconfig.json dist/apps/libs/

EXPOSE 3000

RUN yarn --cwd dist/apps/main-api
RUN yarn --cwd dist/apps/libs

RUN ls dist/apps/main-api -al
RUN ls dist/apps/libs -al

RUN ls /app -al

RUN yarn

CMD yarn --cwd app start:main-api:prd