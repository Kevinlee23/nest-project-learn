import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './entities/blog.entity';
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

  findOne(id: string): Promise<Blog> {
    return this.blogModel.findById(id);
  }

  async list(pagination: Pagination): Promise<PaginationResponse<Blog>> {
    const { size, page } = pagination;
    const total = await this.blogModel.countDocuments();
    return {
      rows: await this.blogModel
        .find()
        .sort({ createTime: -1 })
        .skip((page - 1) * size)
        .limit(size)
        .populate({path: 'commentIds', options: {strictPopulate: false}})
        .exec(),
      total: total,
    };
  }

  async create(blog: CreateBlogDto): Promise<Blog> {
    const { createDate, createTime } = getServiceTime();

    const newBlog: Blog = await this.blogModel.create({
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
