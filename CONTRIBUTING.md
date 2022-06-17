### Access external services

```ts
import { IHealthService } from './adapter';
import { Req } from '@nestjs/common';
import { ApiRequest } from 'libs/utils';

async get(@Req() req: ApiRequest): Promise<string> {
    req.tracing.setTracingTag(req.tracing.tags.PEER_SERVICE, 'github-scrap-api');
    req.tracing.setTracingTag(req.tracing.tags.SPAN_KIND, 'client');
    req.tracing.setTracingTag(req.tracing.tags.PEER_HOSTNAME, 'https://github.com/');
    await req.tracing.axios().get('https://legend-of-github-api.herokuapp.com/user/full?username=mikemajesty');
    return this.healthService.getText();
}
```

### Access internal services

```ts
import { Req } from '@nestjs/common';
import { ApiRequest } from 'libs/utils';

async get(@Req() req: ApiRequest): Promise<string> {
    await req.tracing
      .axios({
        headers: {
          Authorization: `Bearer ${req.headers['Authorization']}`,
        },
      })
      .post(this.secretService.authAPI.url + '/api/login', { login: 'admin', pass: 'admin' });
    return this.healthService.getText();
}

```