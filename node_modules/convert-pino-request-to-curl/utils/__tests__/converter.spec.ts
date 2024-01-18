import { PinoRequestConverter } from '../converter';
import { getDefaultRequest, postDefaultRequest } from './__mocks__/converter';

describe('PinoRequestConverter', () => {
  describe('getCurl', () => {
    describe('GET', () => {
      test('should default get successfully', async () => {
        const curl = `curl --location -g --request GET 'http://[::1]:3000/health' --header 'host: [::1]:3000' --header 'connection: keep-alive' --header 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"' --header 'accept: text/plain' --header 'sec-ch-ua-mobile: ?0' --header 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36' --header 'sec-ch-ua-platform: "Linux"' --header 'sec-fetch-site: same-origin' --header 'sec-fetch-mode: cors' --header 'sec-fetch-dest: empty' --header 'referer: http://[::1]:3000/docs/' --header 'accept-encoding: gzip, deflate, br' --header 'accept-language: en-US,en;q=0.9' --header 'traceId: 96832c78-bfcb-46ec-8fe7-858c1d23182b'`
        const libCurl = PinoRequestConverter.getCurl(getDefaultRequest);
        expect(curl).toEqual(libCurl)
      });
    });


    describe('POST', () => {
      test('should default post successfully', async () => {
        const curl =  `curl --location -g --request POST 'http://[::1]:4000/api/login' --header 'accept: application/json, text/plain, */*' --header 'content-type: application/json' --header 'user-agent: axios/0.26.1' --header 'host: [::1]:4000' --header 'connection: close'  --data-raw '{\"login\":\"admin\",\"pass\":\"admin\"}'`
        const libCurl = PinoRequestConverter.getCurl(postDefaultRequest);
        expect(curl).toEqual(libCurl)
      });
    });
    
  });
});
