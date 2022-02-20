FROM node:14

COPY . /app

WORKDIR /app

RUN ls /app -al

RUN yarn && yarn build @app/student-api

COPY apps/student-api/package.json dist/apps/student-api/
COPY apps/student-api/tsconfig.build.json dist/apps/student-api/
COPY apps/student-api/tsconfig.json dist/apps/student-api/

EXPOSE 3000

RUN yarn --cwd dist/apps/student-api
RUN yarn --cwd dist/apps/libs/modules
RUN yarn --cwd dist/apps/libs/utils
RUN yarn --cwd dist/apps/libs/core

RUN ls dist/apps/student-api -al

RUN ls /app -al

RUN yarn

CMD yarn --cwd app start:student-api:prd