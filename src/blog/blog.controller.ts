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
import { BlogDocument } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags } from '@nestjs/swagger';
import type {
  Pagination,
  PaginationResponse,
} from 'src/common/utils/types/pagination.type';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseInterceptors(TransformInterceptor<BlogDocument[]>)
  @Get('list')
  async list(@Body() query: Pagination) {
    if (query.page <= 0) {
      throw new InternalServerErrorException('页码不能小于零');
    }

    const data: PaginationResponse<BlogDocument> =
      await this.blogService.list(query);
    return { data, message: '获取blog列表成功' };
  }

  @UseInterceptors(TransformInterceptor<BlogDocument>)
  @Get('findOne/:id')
  async findOne(@Param('id') id: string) {
    const data: BlogDocument = await this.blogService.findOne(id);
    return { data, message: '获取blog成功' };
  }

  @UseInterceptors(TransformInterceptor<BlogDocument>)
  @Post('create')
  async create(@Body() blog: CreateBlogDto) {
    const data: BlogDocument = await this.blogService.create(blog);
    return { data, message: '创建成功' };
  }

  @UseInterceptors(TransformInterceptor<null>)
  @Post('update')
  async update(@Body() blog: UpdateBlogDto) {
    const res: boolean = await this.blogService.update(blog);

    if (res) {
      return { data: null, message: '修改成功' };
    } else {
      throw InternalServerErrorException;
    }
  }
}
