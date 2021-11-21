# Nestjs Monorepo 

##### Monorepo using nestjs, docker, libs structure, anti corruption layer, unit and e2e tests and SOLID.

--

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
 - @app/eslint.config
 - @app/libs
 - @app/main.api
 - @app/other.api
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
    # run monorepo tests
    $ yarn test
    ```
    
    ```bash
    # Run project tests
    $ yarn test main.api
    $ yarn test other.api
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
    import { ILoggerService } from '@libs/modules';
    
    export class Exmeple {
      constructor(private readonly loggerService: ILoggerService) {}
    
      async exemple(): void {
        this.loggerService.log('message', 'messageContext');
      }
    }
    ```
  - Secrets
    ```js
    import { ICommonSecrets } from '@libs/modules';
    
    export class Exmeple {
      constructor(private readonly secretService: ICommonSecrets) {}
    
      async exemple(): void {
        this.secretService.PORT;
      }
    }
    ```
 - Error exception

    ```js
    import { ApiException } from '@libs/utils';
    
    export class Exmeple {
      async exemple(): void {
        throw new ApiException('Error', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
    ```
  - Http
      ```js 
      import { IHttpService } from '@libs/modules';
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
### Add new API

  - clone 
   ```base
   git clone https://github.com/mikemajesty/other-api.git
   ```

-- Example App Skeleton
```
├── apps
│   ├── eslint
│   │   └── package.json
│   ├── libs
│   │   ├── core
│   │   │   └── index.ts
│   │   ├── jest.config.js
│   │   ├── modules
│   │   │   ├── http
│   │   │   │   ├── adapter.ts
│   │   │   │   ├── module.ts
│   │   │   │   ├── service.ts
│   │   │   │   └── __tests__
│   │   │   │       ├── module.spec.ts
│   │   │   │       └── service.spec.ts
│   │   │   ├── index.ts
│   │   │   ├── logger
│   │   │   │   ├── adapter.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── module.ts
│   │   │   │   ├── service.ts
│   │   │   │   └── __tests__
│   │   │   │       ├── module.spec.ts
│   │   │   │       └── service.spec.ts
│   │   │   ├── module.ts
│   │   │   ├── secrets
│   │   │   │   ├── adapter.ts
│   │   │   │   ├── enum.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── module.ts
│   │   │   │   ├── service.ts
│   │   │   │   └── __tests__
│   │   │   │       ├── module.spec.ts
│   │   │   │       └── service.spec.ts
│   │   │   └── __tests__
│   │   │       └── module.spec.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── utils
│   │       ├── exception.ts
│   │       ├── filters
│   │       │   ├── http-exception.filter.ts
│   │       │   └── __tests__
│   │       │       └── http-exception.filter.spec.ts
│   │       ├── index.ts
│   │       ├── interceptors
│   │       │   ├── http-exception.interceptor.ts
│   │       │   └── __tests__
│   │       │       └── http-exception.interceptor.spec.ts
│   │       ├── static
│   │       │   └── htttp-status.json
│   │       ├── swagger.ts
│   │       └── __tests__
│   │           └── exception.spec.ts
│   ├── main-api
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
│   │   │       ├── module.ts
│   │   │       └── __tests__
│   │   │           └── module.spec.ts
│   │   ├── tsconfig.build.json
│   │   └── tsconfig.json
│   └── other-api
│       ├── Dockerfile
│       ├── jest.config.js
│       ├── package.json
│       ├── README.md
│       ├── src
│       │   ├── main.ts
│       │   └── modules
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
│       ├── tsconfig.build.json
│       └── tsconfig.json
├── CHANGELOG.md
├── commitlint.config.ts
├── devops
│   └── tag-create.sh
├── docker-compose.yml
├── jest
│   ├── common.js
│   ├── index.js
│   ├── other-api.js
│   └── main-api.js
├── jest.config.e2e.ts
├── jest.config.ts
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

-- Architecture
 - ```/apps/eslint```: Global eslint. All eslint Libs must be here.

 - ```/apps/libs```: Application shared libs.
 - ```/apps/libs/core```: Core business rules, don't use nestjs dependecies here, only class and rules that will be shared with other projects
 - ```/apps/libs/modules```: Application core modules, use only nestjs modules here, you can add modules like: http, databse etc.
 - ```/apps/libs/modules/logger```: Application logs.
 - ```/apps/libs/modules/secrets```: Application secrets.
 - ```/apps/libs/utils```: Application core utilities.

  - ```/apps/main-api```: Application main project.
  - ```/apps/other-api```: Other API to use as you like.

---

The following is a list of all the people that have contributed to nest-boilerplate. Thanks for your contributions!

[<img alt="mikemajesty" src="https://avatars1.githubusercontent.com/u/11630212?s=460&v=4&s=117" width="117">](https://github.com/mikemajesty)

## License

It is available under the MIT license.
[License](https://opensource.org/licenses/mit-license.php)
