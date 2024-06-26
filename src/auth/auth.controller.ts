import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '用户登录' })
  @ApiOkResponse({
    content: {
      'Application/json': {
        example: {
          code: 200,
          message: 'login success',
          data: {
            access_token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwidXNlcm5hbWUiOiJtYXJpYSIsInJvbGVzIjpbInVzZXIiXSwiaWF0IjoxNzEzNTk1NjM4LCJleHAiOjE3MTM2ODIwMzh9.ggPE8t5L2-0ZjE9qUy9t8P7ctqUMJDujoIqPWBM_nzM',
          },
        },
      },
    },
  })
  @Public()
  @Post('login')
  @UseInterceptors(TransformInterceptor<string>)
  signin(@Body() signInDto: SigninDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @ApiOperation({ summary: '获取当前登录用户的信息' })
  @ApiOkResponse({
    content: {
      'Application/json': {
        example: {
          code: 200,
          message: 'get proflie success',
          data: {
            sub: '2',
            username: 'maria',
            roles: ['user'],
            iat: 1713595638,
            exp: 1713682038,
          },
        },
      },
    },
  })
  @Get('profile')
  @UseInterceptors(TransformInterceptor<any>)
  getProfile(@Request() req) {
    return { message: 'get proflie success', data: req.user };
  }
}
