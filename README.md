# Nestjs Monorepo Boilerplate

Check

- [monorepo docs](https://docs.nestjs.com/cli/monorepo)
- [contributing manual](./CONTRIBUTING.md)

| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| ![Statements](https://img.shields.io/badge/statements-92.67%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-64.94%25-red.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-88.09%25-yellow.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-91.5%25-brightgreen.svg?style=flat) |

##### Monorepo with nestjs

- Docker

- Secrets Service

- Logs Service

  - Pinojs
  - Elastic

- Observability

  - Jeager
  - Opentracing

- Authentication

- Error Handler

- Libs Structure

- Dependency Inversion Pattern
- Anti Corruption Layer Pattern
- Interface Adapter Pattern
- Generic Repository Pattern

- Swaggger Documentation

- Redis

- Mongodb

  - mongoose
  - multiples databases

- Tests
  - unit
  - e2e
  - 90% coverage

---

#### Prerequisite

- Node: 14 => <= 16
- Docker
- npm install -g commitizen
- npm install -g changelog

#### Instalation

- install monorepo dependencies
  ```bash
  $ yarn monorepo:install
  ```
- install project dependencies
  ```bash
  $ yarn workspace <workspaceName> install
  ```
- install lib on project
  ```bash
  $ yarn workspace <workspaceName> add <libName>
  ```

---

#### Running local mongodb/redis/kibana/jeager

```bash
$ yarn infra:local
# http://0.0.0.0:8082/ to access mongo
# http://0.0.0.0:8081/ to access redis
# http://0.0.0.0:5601/app/home to access kibana
# http://0.0.0.0:16686/search to access jeager
```

#### Running the app

- local

  ```bash
  $ yarn start:auth-api:dev
  $ yarn start:cats-api:dev
  ```

- dev/hml/prd environment

  ```bash
  $ docker-compose up --build
  ```

---

#### Create Access User

- http://0.0.0.0:8082/db/monorepo_auth/users
- Click [New Document]
  ```
  {
     "_id": ObjectID(),
     "login": "<user>",
     "pass": "<pass>"
  }
  ```
- now use this curl to get your access token
  ```
  curl -X 'POST'  'http://0.0.0.0:4000/api/login'    -H 'accept: application/json'  -H 'Content-Type:  application/json'  -d '{ "login": "<user>", "pass":  "<pass>" }'
  ```
- use this token to access all monorepo internal APIs

---

##### workspace list

```bash
$ yarn workspaces info
```

- @app/cats.api
- @app/auth.api
- @tools/eslint.config
- @libs/utils
- @libs/modules
- @libs/core

---

#### Add new features

```bash
$ npm i -g @mikemajesty/monorepo-nestjs-cli
```

- ```bash
  # type and choose your template
  $ monorepo-nestjs-cli
  ```
  - see [doc](https://github.com/mikemajesty/monorepo-nestjs-cli)

---

#### Tests

- unit

  ```bash
  # Run monorepo tests
  $ yarn test
  ```

  ```bash
  # Run project tests
  $ yarn test main.api
  $ yarn test auth.api
  $ yarn test libs
  ```

- e2e

  ```
  $ yarn test:e2e
  ```

  - coverage

  ```
  $ yarn test:coverage
  ```

---

#### Lint

- Run monorepo lint

  ```bash
  $ yarn lint
  ```

- Run project lint
  ```
  $ yarn workspace <workspaceName> lint
  ```

---

#### Build

- Run project build
  ```
  $ yarn build <workspaceName>
  ```

---

-- App Skeleton

```
.
├── apps
│   ├── auth-api
│   │   ├── Dockerfile
│   │   ├── jest.config.js
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── main.ts
│   │   │   └── modules
│   │   │       ├── health
│   │   │       │   ├── adapter.ts
│   │   │       │   ├── controller.ts
│   │   │       │   ├── module.ts
│   │   │       │   ├── service.ts
│   │   │       │   ├── swagger.ts
│   │   │       │   └── __tests__
│   │   │       │       ├── controller.e2e.spec.ts
│   │   │       │       ├── module.spec.ts
│   │   │       │       └── service.spec.ts
│   │   │       ├── login
│   │   │       │   ├── adapter.ts
│   │   │       │   ├── controller.ts
│   │   │       │   ├── module.ts
│   │   │       │   ├── service.ts
│   │   │       │   ├── swagger.ts
│   │   │       │   └── __tests__
│   │   │       │       ├── controller.e2e.spec.ts
│   │   │       │       └── service.spec.ts
│   │   │       ├── module.ts
│   │   │       ├── __tests__
│   │   │       │   └── module.spec.ts
│   │   │       └── user
│   │   │           ├── adapter.ts
│   │   │           ├── entity.ts
│   │   │           ├── module.ts
│   │   │           ├── repository.ts
│   │   │           ├── schema.ts
│   │   │           └── __tests__
│   │   │               └── repository.spec.ts
│   │   ├── tests
│   │   │   └── initialization.js
│   │   ├── tsconfig.build.json
│   │   ├── tsconfig.json
│   │   └── yarn.lock
│   └── cats-api
│       ├── Dockerfile
│       ├── jest.config.js
│       ├── node_modules
│       ├── package.json
│       ├── src
│       │   ├── main.ts
│       │   └── modules
│       │       ├── cats
│       │       │   ├── adapter.ts
│       │       │   ├── controller.ts
│       │       │   ├── entity.ts
│       │       │   ├── module.ts
│       │       │   ├── repository.ts
│       │       │   ├── schema.ts
│       │       │   ├── swagger.ts
│       │       │   └── __tests__
│       │       │       ├── controller.e2e.spec.ts
│       │       │       └── repository.spec.ts
│       │       ├── health
│       │       │   ├── adapter.ts
│       │       │   ├── controller.ts
│       │       │   ├── module.ts
│       │       │   ├── service.ts
│       │       │   ├── swagger.ts
│       │       │   └── __tests__
│       │       │       ├── controller.e2e.spec.ts
│       │       │       ├── module.spec.ts
│       │       │       └── service.spec.ts
│       │       ├── module.ts
│       │       └── __tests__
│       │           └── module.spec.ts
│       ├── tests
│       │   └── initialization.js
│       ├── tsconfig.build.json
│       └── tsconfig.json
├── CHANGELOG.md
├── commitlint.config.ts
├── CONTRIBUTING.md
├── deploy
│   └── production-version.sh
├── docker-compose-local.yml
├── docker-compose.yml
├── jest.config.e2e.ts
├── jest.config.ts
├── libs
│   ├── core
│   │   ├── index.ts
│   │   ├── jest.config.js
│   │   ├── package.json
│   │   ├── tests
│   │   │   └── initialization.js
│   │   └── tsconfig.json
│   ├── modules
│   │   ├── auth
│   │   │   └── token
│   │   │       ├── adapter.ts
│   │   │       ├── module.ts
│   │   │       ├── service.ts
│   │   │       ├── __tests__
│   │   │       │   └── service.spec.ts
│   │   │       └── types.ts
│   │   ├── common
│   │   │   ├── http
│   │   │   │   ├── adapter.ts
│   │   │   │   ├── module.ts
│   │   │   │   ├── service.ts
│   │   │   │   └── __tests__
│   │   │   │       ├── module.spec.ts
│   │   │   │       └── service.spec.ts
│   │   │   ├── module.ts
│   │   │   └── __tests__
│   │   │       └── module.spec.ts
│   │   ├── database
│   │   │   ├── adapter.ts
│   │   │   ├── connection
│   │   │   │   ├── auth.ts
│   │   │   │   └── cats.ts
│   │   │   ├── entity.ts
│   │   │   ├── enum.ts
│   │   │   ├── repository.ts
│   │   │   ├── service.ts
│   │   │   └── __tests__
│   │   │       ├── repository.spec.ts
│   │   │       └── service.spec.ts
│   │   ├── global
│   │   │   ├── logger
│   │   │   │   ├── adapter.ts
│   │   │   │   ├── module.ts
│   │   │   │   ├── service.ts
│   │   │   │   ├── __tests__
│   │   │   │   │   ├── module.spec.ts
│   │   │   │   │   └── service.spec.ts
│   │   │   │   └── type.ts
│   │   │   ├── module.ts
│   │   │   ├── secrets
│   │   │   │   ├── adapter.ts
│   │   │   │   ├── enum.ts
│   │   │   │   ├── module.ts
│   │   │   │   ├── service.ts
│   │   │   │   └── __tests__
│   │   │   │       ├── module.spec.ts
│   │   │   │       └── service.spec.ts
│   │   │   └── __tests__
│   │   │       └── module.spec.ts
│   │   ├── index.ts
│   │   ├── jest.config.js
│   │   ├── package.json
│   │   ├── redis
│   │   │   ├── adapter.ts
│   │   │   ├── module.ts
│   │   │   ├── service.ts
│   │   │   ├── __tests__
│   │   │   │   └── service.spec.ts
│   │   │   └── types.ts
│   │   ├── __tests__
│   │   │   └── module.spec.ts
│   │   ├── tests
│   │   │   └── initialization.js
│   │   └── tsconfig.json
│   └── utils
│       ├── documentation
│       │   ├── constants.ts
│       │   └── swagger.ts
│       ├── exception.ts
│       ├── filters
│       │   ├── http-exception.filter.ts
│       │   └── __tests__
│       │       └── http-exception.filter.spec.ts
│       ├── index.ts
│       ├── interceptors
│       │   ├── exception
│       │   │   ├── http-exception.interceptor.ts
│       │   │   └── __tests__
│       │   │       └── http-exception.interceptor.spec.ts
│       │   └── logger
│       │       ├── http-logger.interceptor.ts
│       │       ├── http-tracing.interceptor.ts
│       │       └── __tests__
│       │           └── http-logger.interceptor.spec.ts
│       ├── jest.config.js
│       ├── middleware
│       │   └── auth
│       │       ├── is-logged.middleware.ts
│       │       └── __tests__
│       │           └── is-logged.middleware.spec.ts
│       ├── package.json
│       ├── request.ts
│       ├── static
│       │   └── htttp-status.json
│       ├── __tests__
│       │   └── exception.spec.ts
│       ├── tests
│       │   ├── initialization.js
│       │   ├── mock-utils.ts
│       │   └── __tests__
│       │       └── mock-utils.spec.ts
│       └── tsconfig.json
├── nest-cli.json
├── package.json
├── README.md
├── tests
│   └── common-initialization.js
├── tools
│   └── eslint
│       └── package.json
├── tsconfig.build.json
├── tsconfig.json
└── update-version.sh
```

---

#### Architecture

[<img alt="monorepo-diagram" src="https://raw.githubusercontent.com/mikemajesty/nestjs-monorepo/main/libs/utils/documentation/monorepo-diagram.drawio.png" width="350">](https://drive.google.com/file/d/1B8MS8jOJ5fuE_S6BTbDoWJTKgPdBE9m9/view?usp=sharing)

- `├── tools`: Project tools like: eslint, prettier and etc.
- `├── tests`: Monorepo tests initializer like: env, mocks and configs.
- `├── apps`: Monorepo Applications.
- `├── apps ├── auth-api `: Authentication api, use to getting token to navigate between other projects.
- `├── apps ├── cats-api `: Use this API like an example to create other APIs.
- `├── libs`: Application shared libs.
- `├── libs ├── core`: Core business rules, don't use nestjs dependecies here, only class and rules that will be shared with other projects
- `├── libs ├── modules`: Application modules, use only nestjs modules here, you can add modules like: http, databse etc.
- `├── libs ├── utils`: Application utils, utilities that will shared with your monorepo.

- `├── libs ├── modules ├── global ├── secrets`: Monorepo secrets.

---

The following is a list of all the people that have contributed Nestjs monorepo boilerplate. Thanks for your contributions!

[<img alt="mikemajesty" src="https://avatars1.githubusercontent.com/u/11630212?s=460&v=4&s=117" width="117">](https://github.com/mikemajesty)

## License

It is available under the MIT license.
[License](https://opensource.org/licenses/mit-license.php)
