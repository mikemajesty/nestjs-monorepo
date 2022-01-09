/* eslint-disable @typescript-eslint/no-explicit-any */
export class MockUtils {
  static setMock(mock: unknown): any {
    return mock as any;
  }
}
