import { HttpStatus } from '@nestjs/common';

import { ApiException } from '../exception';

describe('ApiException', () => {
  test('should ApiException successfully', () => {
    expect(() => {
      throw new ApiException('BAD_GATEWAY', HttpStatus.BAD_GATEWAY);
    }).toThrowError('BAD_GATEWAY');
  });

  test('should ApiException successfully without status', () => {
    expect(() => {
      throw new ApiException('BAD_REQUEST');
    }).toThrowError('BAD_REQUEST');
  });
});
