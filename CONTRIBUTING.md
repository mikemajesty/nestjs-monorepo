It's good to see you here, this is empty yet, help us change it.

---
#### Usage

  - logs

    ```js
    import { ILoggerService } from 'libs/modules/global/logger/adapter';
    
    export class Exmeple {
      constructor(private readonly loggerService: ILoggerService) {}
    
      async exemple(): void {
        this.loggerService.log('message', 'messageContext');
        this.loggerService.error('error', 500);
      }
    }
    ```
  - Secrets

    ```js
    import { ISecretsService } from 'libs/modules/global/secrets/adapter';
    
    export class Exmeple {
      constructor(private readonly secretService: ISecretsService) {}
    
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
    import { IHttpService } from 'libs/modules/common/http/adapter';

    export class Example {
        constructor(
          private readonly httpService: IHttpService,
        ) {}

        async exemple(): Promise<string> {
          const { data } = await this.httpService.http.get('http://url');

          return data;
        }
    }
    ```