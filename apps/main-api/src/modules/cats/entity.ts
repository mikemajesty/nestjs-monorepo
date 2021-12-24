import { ApiProperty } from '@nestjs/swagger';

export abstract class CatDTO {
  @ApiProperty({ description: 'Cats name' })
  name: string;

  @ApiProperty({ description: 'Cats age' })
  age: number;

  @ApiProperty({ description: 'Cats breed' })
  breed: string;
}
