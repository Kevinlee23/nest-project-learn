import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './entities/blog.entity';
import { Comment } from './entities/comment.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import type {
  Pagination,
  PaginationResponse,
} from 'src/common/utils/types/pagination.type';
import { getServiceTime } from 'src/common/utils/utils';

export type ServiceBolRes = { status: boolean; message: string };

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

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
        .populate({ path: 'commentIds', options: { strictPopulate: false } })
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

  async update(blog: UpdateBlogDto): Promise<ServiceBolRes> {
    const id: string = blog.id;
    try {
      await this.blogModel.updateOne({ id }, { ...blog });
      return { status: true, message: '修改成功' };
    } catch (error) {
      console.error(error);
      return { status: false, message: '修改失败, 内部错误' };
    }
  }

  async delete(id: string): Promise<ServiceBolRes> {
    const item = await this.findOne(id);

    if (item) {
      const commentIds = item.commentIds;
      try {
        await this.commentModel.deleteMany({
          _id: { $in: commentIds },
        });
        await this.blogModel.deleteOne({ _id: id });

        return { status: true, message: '删除成功' };
      } catch (error) {
        return { status: false, message: '删除失败, 内部错误' };
      }
    } else {
      return { status: true, message: '删除失败, 该文章不存在' };
    }
  }
}
