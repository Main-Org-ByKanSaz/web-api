import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetUserByIdDto } from './dto/get-user-by-id.dto';
import { UserService } from './user.service';
import { userEntity } from './entities/user-entity';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  @ApiQuery({
    name: 'userId',
    type: Number,
    description: 'The ID of the user to retrieve',
    example: 1,
    required: true,
  })
  getUserById(@Query() query: GetUserByIdDto): Promise<userEntity> {
    return this.appService.getUserById(query.userId);
  }

  // @Post()
  // createUser(): any {
  //   return this.appService.createUser();
  // }

  // @Put()
  // updateUser(): any {
  //   return this.appService.updateUser();
  // }

  // @Delete()
  // deleteUser(): any {
  //   return this.appService.deleteUser();
  // }
}
