# Nestjs Monorepo 

##### Monorepo using nestjs, docker, libs structure, anti corruption layer, unit tests and SOLID.

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

 - Run monorepo lint 
    ```bash
    $ yarn lint
    ```
 - Run project lint
    ```
    $ yarn workspace <workspaceName> lint
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
      import { IHttpService } from '../common/http/adapter';
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

#### Adding a new API

 - To add a new API to monorepo, clone and adds on apps folder
   ```sh
   $ git clone https://github.com/mikemajesty/monorepo-api-project.git
   ```

-- Example App Skeleton
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
-- Architecture
 - ```/apps/eslint```: Global eslint. All eslint Libs must be here.

 - ```/apps/libs```: Application shared libs.
 - ```/apps/libs/core```: Core business rules and integration with others services, don't use nestjs dependecies here, only class and rules that will be shared with other projects
 - ```/apps/libs/modules```: Application core modules, use only nestjs modules here, you can add modules like: http, databse etc.
 - ```/apps/libs/modules/logger```: Application logs.
 - ```/apps/libs/modules/secrets```: Application secrets.
 - ```/apps/libs/utils```: Application core utilities.

  - ```/apps/main-api```: Application main project.

---

The following is a list of all the people that have contributed to nest-boilerplate. Thanks for your contributions!

[<img alt="mikemajesty" src="https://avatars1.githubusercontent.com/u/11630212?s=460&v=4&s=117" width="117">](https://github.com/mikemajesty)

## License

It is available under the MIT license.
[License](https://opensource.org/licenses/mit-license.php)
