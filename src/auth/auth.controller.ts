import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';

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
  @HttpCode(HttpStatus.OK)
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
  @UseGuards(AuthGuard)
  @Get('profile')
  @UseInterceptors(TransformInterceptor<any>)
  getProfile(@Request() req) {
    return { message: 'get proflie success', data: req.user };
  }
}
