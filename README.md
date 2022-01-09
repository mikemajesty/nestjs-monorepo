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

 - Redis

 - Mongodb
    - mongoose
    - multiples databases

 - Tests
    - unit
    - e2e
---

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
 - @app/other.api
 - @tools/eslint.config
 - @libs/utils
 - @libs/modules
 - @libs/core
---

#### Running the app
 - local
    ```bash
    $ yarn start:main
    $ yarn start:other
    ```

 - dev/hml/prd environment
    ```bash
    $ docker-compose up --build
    ```

#### Running local mongodb
```
$ yarn mongo:dev
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
### Adding new API

  - clone 
   ```base
   git clone https://github.com/mikemajesty/other-api.git
   ```

-- Example App 

```bash
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
