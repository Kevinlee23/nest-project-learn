import { Headers, Controller, UseInterceptors, Get } from '@nestjs/common';
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
}
