# Convert Pino request to curl

```bash
$ npm i -S convert-pino-request-to-curl
```

## Usage

```ts
// pino http config
import { pinoHttp } from 'pino-http';
import { pino } from 'pino';

import { PinoRequestConverter } from 'convert-pino-request-to-curl';

pinoHttp(
  ...
serializers: {
    err: pino.stdSerializers.err,
    req: (req) => {
      return {
        method: req.method,
        curl: PinoRequestConverter.getCurl(req),
      };
     },
    res: pino.stdSerializers.res,
}
...
)


```


```bash
curl --location -g --request GET '[::1]:3000/health' \
--header 'host: [::1]:3000' \
--header 'connection: keep-alive' \
--header 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"' \
--header 'accept: text/plain' \
--header 'sec-ch-ua-mobile: ?0' \
--header 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36' \
--header 'sec-ch-ua-platform: "Linux"' \
--header 'sec-fetch-site: same-origin' \
--header 'sec-fetch-mode: cors' \
--header 'sec-fetch-dest: empty' \
--header 'referer: http://[::1]:3000/docs/' \
--header 'accept-encoding: gzip, deflate, br' \
--header 'accept-language: en-US,en;q=0.9' \
--header 'traceId: 96832c78-bfcb-46ec-8fe7-858c1d23182b'
```

---

The following is a list of all the people that have contributed to convert-pino-request-to-curl. Thanks for your contributions!

[<img alt="mikemajesty" src="https://avatars1.githubusercontent.com/u/11630212?s=460&v=4&s=117" width="117">](https://github.com/mikemajesty)

## License

It is available under the MIT license.
[License](https://opensource.org/licenses/mit-license.php)
