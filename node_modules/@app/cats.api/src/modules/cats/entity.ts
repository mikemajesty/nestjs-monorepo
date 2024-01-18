import { ApiProperty } from '@nestjs/swagger';

import { Cats } from './schema';

export class CatsEntity implements Cats {
  @ApiProperty({ description: 'Cats name' })
  name: string;

  @ApiProperty({ description: 'Cats age' })
  age: number;

  @ApiProperty({ description: 'Cats status' })
  status: 'aproved' | 'pending' = 'pending';

  @ApiProperty({ description: 'Cats breed' })
  breed: string;
}
