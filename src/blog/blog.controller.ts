import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { BlogService } from './blog.service';
import { Blog, BlogDocument } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('list')
  list(): Promise<Blog[]> {
    return this.blogService.list();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @UseInterceptors(TransformInterceptor<BlogDocument>)
  @Post('create')
  async create(@Body() blog: CreateBlogDto) {
    const data = await this.blogService.create(blog);
    return { data, message: '创建成功' };
  }

  @UseInterceptors(TransformInterceptor<null>)
  @Post('update')
  async update(@Body() blog: UpdateBlogDto) {
    const res = await this.blogService.update(blog);

    if (res) {
      return { data: null, message: '修改成功' };
    } else {
      throw InternalServerErrorException;
    }
  }
}
