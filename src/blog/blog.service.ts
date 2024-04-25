import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import type {
  Pagination,
  PaginationResponse,
} from 'src/common/utils/types/pagination.type';
import { getServiceTime } from 'src/common/utils/utils';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  findOne(id: string): Promise<BlogDocument> {
    return this.blogModel.findById(id);
  }

  async list(
    pagination: Pagination,
  ): Promise<PaginationResponse<BlogDocument>> {
    const { size, page } = pagination;
    const total = await this.blogModel.countDocuments();
    console.log(total);
    return {
      rows: await this.blogModel
        .find()
        .sort({ createTime: -1 })
        .skip((page - 1) * size)
        .limit(size)
        .exec(),
      total: total,
    };
  }

  async create(blog: CreateBlogDto): Promise<BlogDocument> {
    const { createDate, createTime } = getServiceTime();

    const newBlog: BlogDocument = await this.blogModel.create({
      ...blog,
      createDate,
      createTime,
    });
    return newBlog;
  }

  async update(blog: UpdateBlogDto): Promise<boolean> {
    const id: string = blog.id;
    try {
      await this.blogModel.updateOne({ id }, { ...blog });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
