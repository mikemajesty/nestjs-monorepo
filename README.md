# Nestjs Monorepo

Check the [contributing manual](./CONTRIBUTING.md)

##### Monorepo with nestjs
 - Docker
 
 - Secrets Service
 - Logs Service

 - Error Handler

 - Libs Structure

 - Dependency Inversion Pattern
 - Anti Corruption Layer Pattern
 - Adapter Pattern
 - Generic Repository Pattern

 - swaggger documentation

 - Mongodb
    - mongoose
    - multiples databases

 - Tests
    - unit
    - e2e
---

#### Prerequisite
 - Node: 14 > < 15
 - Docker
 - npm install -g commitizen
 - npm i -g @mikemajesty/monorepo-nestjs-cli

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
##### workspace list
<!--$ yarn workspaces info -->
 - @app/main.api
 - @app/auth.api
 - @tools/eslint.config
 - @libs/utils
 - @libs/modules
 - @libs/core
---

#### Running the app
 - local

    ```bash
    $ yarn start:other-api:dev
    $ yarn start:main-api:dev
    ```

 - dev/hml/prd environment

    ```bash
    $ docker-compose up --build
    ```
 
#### Add new features
  - add new module
  ```bash
    yarn add:module
  ```
  - add new api
  ```bash
    yarn add:app
  ```
  - add new test
  ```bash
    yarn add:test
  ```

#### Running local mongodb
```bash
$ yarn infra:local
```


#### Tests
 - unit
    ```bash
    # run monorepo tests
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

#### Lint

 - Run monorepo lint 
    ```bash
    $ yarn lint
    ```
 - Run project lint
    ```
    $ yarn workspace <workspaceName> lint
    ```

#### Build

 - Run project build
    ```
    $ yarn build <workspaceName>
    ```

#### Usage

 - logs
    ```js
    import { ILoggerService } from 'libs/modules';
    
    export class Exmeple {
      constructor(private readonly loggerService: ILoggerService) {}
    
      async exemple(): void {
        this.loggerService.log('message', 'messageContext');
        this.loggerService.error('error', 500,  `${Exmeple.name}/${exemple.name}`);
      }
    }
    ```
  - Secrets
    ```js
    import { ICommonSecrets } from 'libs/modules';
    
    export class Exmeple {
      constructor(private readonly secretService: ICommonSecrets) {}
    
      async exemple(): void {
        this.secretService.PORT;
      }
    }
    ```
 - Error exception

    ```js
    import { ApiException } from 'libs/utils';
    
    export class Exmeple {
      async exemple(): void {
        throw new ApiException('Error', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
    ```
  - Http
      ```js 
      import { IHttpService } from 'libs/modules';
      export class Example {
         constructor(
            private readonly httpService: IHttpService,
         ) {}

         async exemple(): Promise<string> {
            const { data } = await this.httpService.http.get('http://url');

            return data.message;
         }
      }
      ```
##### Adding new API

  - clone
   ```base
   $ yarn monorepo-nestjs-cli --app
   ```
##### Adding new module

  - clone
   ```base
   $ yarn monorepo-nestjs-cli --module
   ```
##### Adding new test

  - clone
   ```base
   $ yarn monorepo-nestjs-cli --test
   ```

-- Example App 

```bash
.
├── apps
│   ├── auth-api
│   │   ├── Dockerfile
│   │   ├── jest.config.js
│   │   ├── package.json
│   │   ├── src
│   │   │   ├── main.ts
│   │   │   └── modules
│   │   │       ├── health
│   │   │       │   ├── adapter.ts
│   │   │       │   ├── controller.ts
│   │   │       │   ├── module.ts
│   │   │       │   ├── service.ts
│   │   │       │   ├── swagger.ts
│   │   │       │   └── __tests__
│   │   │       │       ├── controller.e2e.spec.ts
│   │   │       │       ├── module.spec.ts
│   │   │       │       └── service.spec.ts
│   │   │       ├── module.ts
│   │   │       └── __tests__
│   │   │           └── module.spec.ts
│   │   ├── tests
│   │   │   └── initialization.js
│   │   ├── tsconfig.build.json
│   │   └── tsconfig.json
│   └── main-api
│       ├── Dockerfile
│       ├── jest.config.js
│       ├── package.json
│       ├── src
│       │   ├── main.ts
│       │   └── modules
│       │       ├── cats
│       │       │   ├── adapter.ts
│       │       │   ├── controller.ts
│       │       │   ├── entity.ts
│       │       │   ├── module.ts
│       │       │   ├── repository.ts
│       │       │   ├── schema.ts
│       │       │   ├── swagger.ts
│       │       │   └── __tests__
│       │       │       ├── controller.e2e.spec.ts
│       │       │       └── repository.spec.ts
│       │       ├── health
│       │       │   ├── adapter.ts
│       │       │   ├── controller.ts
│       │       │   ├── module.ts
│       │       │   ├── service.ts
│       │       │   ├── swagger.ts
│       │       │   └── __tests__
│       │       │       ├── controller.e2e.spec.ts
│       │       │       ├── module.spec.ts
│       │       │       └── service.spec.ts
│       │       ├── module.ts
│       │       └── __tests__
│       │           └── module.spec.ts
│       ├── tests
│       │   └── initialization.js
│       ├── tsconfig.build.json
│       └── tsconfig.json
├── CHANGELOG.md
├── commitlint.config.ts
├── CONTRIBUTING.md
├── devops
│   └── tag-create.sh
├── docker-compose-local.yml
├── docker-compose.yml
├── jest.config.e2e.ts
├── jest.config.ts
├── libs
│   ├── core
│   │   ├── index.ts
│   │   ├── jest.config.js
│   │   ├── package.json
│   │   ├── tests
│   │   │   └── initialization.js
│   │   └── tsconfig.json
│   ├── modules
│   │   ├── common
│   │   │   ├── http
│   │   │   │   ├── adapter.ts
│   │   │   │   ├── module.ts
│   │   │   │   ├── service.ts
│   │   │   │   └── __tests__
│   │   │   │       ├── module.spec.ts
│   │   │   │       └── service.spec.ts
│   │   │   ├── index.ts
│   │   │   ├── module.ts
│   │   │   └── __tests__
│   │   │       └── module.spec.ts
│   │   ├── database
│   │   │   ├── adapter.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── cats.module.ts
│   │   │   ├── entity.ts
│   │   │   ├── repository.ts
│   │   │   ├── service.ts
│   │   │   └── __tests__
│   │   │       ├── repository.spec.ts
│   │   │       └── service.spec.ts
│   │   ├── global
│   │   │   ├── index.ts
│   │   │   ├── logger
│   │   │   │   ├── adapter.ts
│   │   │   │   ├── module.ts
│   │   │   │   ├── service.ts
│   │   │   │   └── __tests__
│   │   │   │       ├── module.spec.ts
│   │   │   │       └── service.spec.ts
│   │   │   ├── module.ts
│   │   │   ├── secrets
│   │   │   │   ├── adapter.ts
│   │   │   │   ├── enum.ts
│   │   │   │   ├── module.ts
│   │   │   │   ├── service.ts
│   │   │   │   └── __tests__
│   │   │   │       ├── module.spec.ts
│   │   │   │       └── service.spec.ts
│   │   │   └── __tests__
│   │   │       └── module.spec.ts
│   │   ├── index.ts
│   │   ├── jest.config.js
│   │   ├── package.json
│   │   ├── __tests__
│   │   │   └── module.spec.ts
│   │   ├── tests
│   │   │   └── initialization.js
│   │   └── tsconfig.json
│   └── utils
│       ├── documentation
│       │   ├── constants.ts
│       │   └── swagger.ts
│       ├── exception.ts
│       ├── filters
│       │   ├── http-exception.filter.ts
│       │   └── __tests__
│       │       └── http-exception.filter.spec.ts
│       ├── index.ts
│       ├── interceptors
│       │   ├── http-exception.interceptor.ts
│       │   ├── http-performance.interceptor.ts
│       │   └── __tests__
│       │       ├── http-exception.interceptor.spec.ts
│       │       └── http-performance.interceptor.spec.ts
│       ├── jest.config.js
│       ├── package.json
│       ├── static
│       │   └── htttp-status.json
│       ├── __tests__
│       │   └── exception.spec.ts
│       ├── tests
│       │   ├── initialization.js
│       │   ├── mock-utils.ts
│       │   └── __tests__
│       │       └── mock-utils.spec.ts
│       └── tsconfig.json
├── nest-cli.json
├── package.json
├── README.md
├── tests
│   └── common-initialization.js
├── tools
│   └── eslint
│       └── package.json
├── tsconfig.build.json
└── tsconfig.json
```

---
 #### Architecture
 - ```├── tools```: Project  tools like: eslint, prettier and etc.
 - ```├── libs```: Application shared libs.
 - ```├── libs ├── core```: Core business rules, don't use nestjs dependecies here, only class and rules that will be shared with other projects
 - ```├── libs ├── modules```: Application modules, use only nestjs modules here, you can add modules like: http, databse etc.
 - ```├── libs ├── utils```: Application utils, utilities that will shared with your monorepo.
 - ```├── apps```: Monorepo Applications.
 - ```├── tests```: Monorepo tests initializer like: env, mocks and configs.
 - ```├── secrets```: Monorepo secrets.

---

The following is a list of all the people that have contributed to nest-boilerplate. Thanks for your contributions!

[<img alt="mikemajesty" src="https://avatars1.githubusercontent.com/u/11630212?s=460&v=4&s=117" width="117">](https://github.com/mikemajesty)

## License

It is available under the MIT license.
[License](https://opensource.org/licenses/mit-license.php)



