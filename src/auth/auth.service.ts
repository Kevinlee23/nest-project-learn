import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    try {
      if (!user) {
        throw new UnauthorizedException('用户名不存在');
      } else if (user.password !== pass) {
        throw new UnauthorizedException('密码错误');
      } else {
        const payload = {
          sub: user.userId,
          username: user.username,
          roles: user.roles,
        };

        return {
          message: 'login success',
          data: { access_token: await this.jwtService.signAsync(payload) },
        };
      }
    } catch (error) {
      return {
        code: 401,
        message: error.response.message,
      };
    }
  }
}
