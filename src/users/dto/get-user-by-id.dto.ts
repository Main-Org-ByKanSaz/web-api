import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserByIdDto {
  @ApiProperty({
    description: 'The ID of the user to retrieve',
    example: 1,
    default: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  userId!: number;
}
