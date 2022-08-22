# HTTP

---

### Access external services

```ts
import { IHealthService } from './adapter';
import { Req } from '@nestjs/common';
import { ApiRequest } from 'libs/utils';

async get(@Req() req: ApiRequest): Promise<string> {
    const path = `${this.secretService.GITHUB_SCRAP_API}/user/full`;

    const tracer = req.tracing.initTracer('legend-of-github-api').startSpan(path, { childOf: req.tracing.span });

    try {
      tracer.addTags({ app: 'legend-of-github-api' });
      tracer.addTags({ component: 'HealthController/getHealth' });
      tracer.addTags({ path: '/user/full' });
      tracer.addTags({ method: 'GET' });
      tracer.addTags({ traceId: req.id });
      tracer.addTags({ body: {} });
      tracer.addTags({ headers: {} });

      const result = await req.tracing.axios({ params: { username: 'mikemajesty' } }).get(path);

      tracer.addTags({ statusCode: result.status });

      tracer.finish();

      return this.healthService.getText();
    } catch (error) {
      tracer.setTag(req.tracing.tags.ERROR, true);
      tracer.setTag('message', error.message);
      tracer.setTag('statusCode', [error.status, error.getStatus())].find(Boolean);
      tracer.finish();
      throw error;
    }
}
// OR
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

---
