import { ApiProperty } from '@nestjs/swagger';

import { Cats } from './schema';

export class CatsDTO implements Cats {
  @ApiProperty({ description: 'Cats name' })
  name: string;

  @ApiProperty({ description: 'Cats age' })
  age: number;

  @ApiProperty({ description: 'Cats breed' })
  breed: string;

  timestamp: number = Date.now();
}
