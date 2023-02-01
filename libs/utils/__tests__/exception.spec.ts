import { HttpStatus } from '@nestjs/common';

import { ApiException } from '../src/exception';

describe('ApiException', () => {
  test('should ApiException successfully', () => {
    expect(() => {
      throw new ApiException('BAD_GATEWAY', HttpStatus.BAD_GATEWAY);
    }).toThrow('BAD_GATEWAY');
  });

  test('should ApiException successfully without status', () => {
    expect(() => {
      throw new ApiException('BAD_REQUEST');
    }).toThrow('BAD_REQUEST');
  });

  test('should ApiException successfully with context', () => {
    const error = new ApiException('BAD_REQUEST', HttpStatus.BAD_GATEWAY, 'Error');
    expect(error).toBeInstanceOf(ApiException);
  });
});
