import {
  Headers,
  Controller,
  UseInterceptors,
  Get,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { Visitor } from './entities/visitors.entity';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('visitor')
export class VisitorController {
  constructor(private readonly service: VisitorService) {}

  @Get('info')
  @Public()
  @UseInterceptors(TransformInterceptor<Visitor>)
  async info(@Headers() header) {
    const uuid = header['x-session-uuid'];

    const res = await this.service.findVisitor(uuid);

    if (res) {
      return { data: res, message: '查询访客数据成功' };
    } else {
      const createRes = await this.service.createVisitor(uuid);

      return { data: createRes, message: '查询访客数据成功' };
    }
  }

  @Post('updateNickname')
  @Public()
  @UseInterceptors(TransformInterceptor<null>)
  async updateNickName(@Body() body, @Headers() header) {
    const { nickname } = body;
    const uuid = header['x-session-uuid'];

    try {
      await this.service.updateNickname(uuid, nickname);
      return { data: null, message: '更新昵称成功' };
    } catch (error) {
      throw new InternalServerErrorException('系统错误, 操作失败');
    }
  }
}
