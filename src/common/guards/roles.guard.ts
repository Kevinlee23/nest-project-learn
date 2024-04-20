import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/constants/role.enum';
import { ROLES_KEY } from 'src/common/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    /** 通过 reflector 来获取路由处理函数或者控制器 Class 上附加的元数据
     * 有针对性的对于某些路由处理函数进行覆盖: 使用 getAllAndOverride
     * 如果需要合并: 使用 getAllAndMerge
     * 如果只是简单的读取: 使用 get
     */
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const index = requiredRoles.findIndex((item) => user.roles.includes(item));

    if (index === -1) {
      throw new UnauthorizedException('所属用户组权限不够');
    }

    return true;
  }
}
