# Nestjs Monorepo 

#### Monorepo using nestjs, docker and libs structure. Simple Code base you will like it.
--
```
.dockerignore
.env
.eslintignore
.eslintrc.js
.gitignore
.husky
   |-- .gitignore
   |-- commit-msg
   |-- husky.sh
   |-- pre-commit
.prettierrc.json
.vscode
   |-- extensions.json
   |-- launch.json
   |-- settings.json
CHANGELOG.md
README.md
apps
   |-- eslint
   |   |-- .eslintrc.json
   |   |-- package.json
   |-- libs
   |   |-- .dockerignore
   |   |-- .eslintignore
   |   |-- .vscode
   |   |   |-- settings.json
   |   |-- core
   |   |   |-- index.ts
   |   |-- jest.config.js
   |   |-- modules
   |   |   |-- __tests__
   |   |   |   |-- module.spec.ts
   |   |   |-- index.ts
   |   |   |-- logger
   |   |   |   |-- __tests__
   |   |   |   |   |-- module.spec.ts
   |   |   |   |   |-- service.spec.ts
   |   |   |   |-- adapter.ts
   |   |   |   |-- index.ts
   |   |   |   |-- module.ts
   |   |   |   |-- service.ts
   |   |   |-- module.ts
   |   |   |-- secrets
   |   |   |   |-- __tests__
   |   |   |   |   |-- module.spec.ts
   |   |   |   |   |-- service.spec.ts
   |   |   |   |-- adapter.ts
   |   |   |   |-- enum.ts
   |   |   |   |-- index.ts
   |   |   |   |-- module.ts
   |   |   |   |-- service.ts
   |   |-- package.json
   |   |-- tsconfig.json
   |   |-- utils
   |   |   |-- __tests__
   |   |   |   |-- exception.spec.ts
   |   |   |-- exception.ts
   |   |   |-- filters
   |   |   |   |-- __tests__
   |   |   |   |   |-- http-exception.filter.spec.ts
   |   |   |   |-- http-exception.filter.ts
   |   |   |-- index.ts
   |   |   |-- interceptors
   |   |   |   |-- __tests__
   |   |   |   |   |-- http-exception.interceptor.spec.ts
   |   |   |   |-- http-exception.interceptor.ts
   |   |   |-- static
   |   |   |   |-- htttp-status.json
   |   |   |-- swagger.ts
   |-- main-api
   |   |-- .dockerignore
   |   |-- .eslintignore
   |   |-- .vscode
   |   |   |-- settings.json
   |   |-- Dockerfile
   |   |-- jest.config.js
   |   |-- package.json
   |   |-- src
   |   |   |-- main.ts
   |   |   |-- modules
   |   |   |   |-- __tests__
   |   |   |   |   |-- module.spec.ts
   |   |   |   |-- health
   |   |   |   |   |-- __tests__
   |   |   |   |   |   |-- controller.e2e.spec.ts
   |   |   |   |   |   |-- module.spec.ts
   |   |   |   |   |   |-- service.spec.ts
   |   |   |   |   |-- adapter.ts
   |   |   |   |   |-- controller.ts
   |   |   |   |   |-- module.ts
   |   |   |   |   |-- service.ts
   |   |   |   |   |-- swagger.ts
   |   |   |   |-- module.ts
   |   |-- tsconfig.build.json
   |   |-- tsconfig.json
commitlint.config.ts
devops
   |-- tag-create.sh
docker-compose.yml
jest.config.e2e.ts
jest.config.ts
jest
   |-- common.js
   |-- index.js
   |-- main.js
nest-cli.json
package.json
tsconfig.build.json
tsconfig.json
```
--
#### Instalation

 - install all dependencies
    ```bash
    $ monorepo:install
    ```
 - install individual project
    ```bash
    $ yarn workspace <workspaceName> install
    ```
##### workspace list
 - @app/eslint.config
 - @app/libs
 - @app/main.api
---

#### Running the app
 - local
    ```bash
    $ yarn start:dev
    ```

 - dev/hml/prd environment
    ```bash
    $ docker-compose up --build
    ```

#### Tests
 - unit
    ```bash
    # run all tests
    $ yarn test
    ```
    
    ```bash
    # run individual tests project
    $ yarn test main
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

#### Lint

 - Run all lint
    ```bash
    $ yarn lint
    ```
 - Run individual lint project
    ```
    $ yarn workspace <workspaceName> lint
    ```

