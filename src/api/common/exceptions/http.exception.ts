class HttpException extends Error {
  cause: unknown;
  constructor(
    public statusCode: number = 500,
    data:
      | string
      | {
          message: string;
          [key: string]: unknown;
        },
  ) {
    super(typeof data === 'string' ? data : data.message);
    this.statusCode = statusCode;
  }
}

export default HttpException;
