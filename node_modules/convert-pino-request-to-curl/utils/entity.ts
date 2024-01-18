
  interface Body {

  }

  interface Raw {
    body: Body
    protocol: string
    _body?: boolean
  }

  export interface RequestType {
      id: number | string;
      method: string;
      url: string;
      query: any;
      params: any;
      raw: Raw;
      headers: any;
      remoteAddress: string;
      remotePort: number;
  }


