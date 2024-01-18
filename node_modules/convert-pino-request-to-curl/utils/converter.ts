import { RequestType } from "./entity";

export class PinoRequestConverter {

  static getCurl(request: RequestType): string {
    let header = '';

    delete request.headers['content-length']

    Object.keys(request?.headers || {}).forEach(
      (r) => (header += `--header '${r}: ${request.headers[String(r)]}' `),
    );

    let params = '';
    Object.keys(request?.params).forEach((p) => (params += `/${p}/${request.params[String(p)]}`));

    const hasQueryParams = new RegExp('\\?.*').exec(request.url) || [];

    let query = '';
    if (hasQueryParams.length) {
      query = hasQueryParams[0] as string;
      request.url = request.url.substring(0, request.url.lastIndexOf('?'));
    }

    const rawBody = request?.raw?.body

    const body = `--data-raw '${rawBody ? JSON.stringify(rawBody) : undefined}'`;
    const paramsUrl = `${(request === null || request === void 0 ? void 0 : request.params) ? params : ''}`;
    const protocol = request.raw.protocol;
    const curl = `curl --location -g --request ${request.method.toUpperCase()} '${protocol + '://' + request.headers.host + request.url + paramsUrl + query}' ${header} ${Object.keys(rawBody)?.length ? body : ''}`;
    return curl.trim();
  }

}
