import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserByIdDto {
  @ApiProperty({
    description: 'The ID of the user to retrieve',
    example: 'usr_9x1vmo88',
  })
  @IsNotEmpty()
  @IsString()
  @Type(() => String)
  userId!: string;
}
