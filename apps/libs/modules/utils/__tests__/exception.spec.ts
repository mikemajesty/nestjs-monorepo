import { HttpStatus } from '@nestjs/common';

import { AppException } from '../exception';

describe('AppException', () => {
  test('should AppException successfully', () => {
    expect(() => {
      throw new AppException('BAD_GATEWAY', HttpStatus.BAD_GATEWAY);
    }).toThrowError('BAD_GATEWAY');
  });

  test('should AppException successfully without status', () => {
    expect(() => {
      throw new AppException('BAD_REQUEST');
    }).toThrowError('BAD_REQUEST');
  });
});
