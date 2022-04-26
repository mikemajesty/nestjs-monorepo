import { HttpException } from '@nestjs/common';
import { ApiException } from 'libs/utils';

export type MessageType = {
  message: string;
  context?: string;
  obj?: object;
};

export type ErrorType = HttpException | ApiException;
