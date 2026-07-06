import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

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
