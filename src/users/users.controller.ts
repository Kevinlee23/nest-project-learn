import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/constants/role.enum';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: '创建用户' })
  @ApiOkResponse({
    content: {
      'Application/json': {
        example: {
          code: 200,
          message: 'create new user',
          data: {
            id: 123,
          },
        },
      },
    },
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('create')
  @UseInterceptors(TransformInterceptor<CreateUserDto>)
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }
}
