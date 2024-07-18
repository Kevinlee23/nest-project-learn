import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseInterceptors,
  InternalServerErrorException,
  Headers,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { BlogService, ServiceBolRes } from './blog.service';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags } from '@nestjs/swagger';
import type {
  Pagination,
  PaginationResponse,
} from 'src/common/utils/types/pagination.type';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Public()
  @UseInterceptors(TransformInterceptor<Blog[]>)
  @Post('list')
  async list(@Body() query: Pagination) {
    if (query.page <= 0) {
      throw new InternalServerErrorException('页码不能小于零');
    }

    const data: PaginationResponse<Blog> = await this.blogService.list(query);
    return { data, message: '获取blog列表成功' };
  }

  @Get('findOne/:id')
  @Public()
  @UseInterceptors(TransformInterceptor<Blog>)
  async findOne(@Param('id') id: string) {
    const data: Blog = await this.blogService.findOne(id);
    return { data, message: '获取blog成功' };
  }

  @Post('create')
  @UseInterceptors(TransformInterceptor<Blog>)
  async create(@Body() blog: CreateBlogDto) {
    const data: Blog = await this.blogService.create(blog);
    return { data, message: '创建成功' };
  }

  @Post('update')
  @UseInterceptors(TransformInterceptor<null>)
  async update(@Body() blog: UpdateBlogDto) {
    const res: ServiceBolRes = await this.blogService.update(blog);

    if (res.status) {
      return { data: null, message: res.message };
    } else {
      throw new InternalServerErrorException(res.message);
    }
  }

  @Post('deleteOne')
  @UseInterceptors(TransformInterceptor<null>)
  async deleteOne(@Body() body: { id: string }) {
    const res: ServiceBolRes = await this.blogService.delete(body.id);

    if (res.status) {
      return { data: null, message: res.message };
    } else {
      throw new InternalServerErrorException(res.message);
    }
  }

  @Post('like')
  @Public()
  @UseInterceptors(TransformInterceptor<null>)
  async likeBlog(
    @Body() body: { blogId: string; cal: string },
    @Headers() header,
  ) {
    const uuid = header['x-session-uuid'];

    try {
      await this.blogService.likeCal(uuid, body.blogId, body.cal);

      return {
        data: null,
        message: '操作成功',
      };
    } catch (error) {
      throw new InternalServerErrorException('系统错误, 操作失败');
    }
  }
}
