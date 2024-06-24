import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './entities/blog.entity';
import { CommenDocument, Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { getServiceTime } from 'src/common/utils/utils';
import {
  Pagination,
  PaginationResponse,
} from 'src/common/utils/types/pagination.type';

export type ServiceBolRes = { status: boolean; message: string };

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async insert(comment: CreateCommentDto): Promise<ServiceBolRes> {
    const { createDate, createTime } = getServiceTime();

    const res: CommenDocument = await this.commentModel.create({
      ...comment,
      createDate,
      createTime,
    });

    if (res) {
      await this.blogModel.updateOne(
        { _id: comment.blogId },
        { $push: { commentIds: res._id } },
      );

      return { status: true, message: '评论成功' };
    } else {
      return { status: false, message: '评论失败, 内部错误' };
    }
  }

  async list(
    pagination: Pagination & { blogId: string },
  ): Promise<PaginationResponse<Comment>> {
    const { page, size, blogId } = pagination;

    const totalRes = await this.blogModel.findOne({ _id: blogId });
    const total = totalRes.commentIds.length;

    // 根据 blog 中留存的 comment ids 查找出 comment list
    const res: BlogDocument = await this.blogModel
      .findOne({ _id: blogId })
      .populate({
        path: 'commentIds',
        options: {
          skip: (page - 1) * size,
          limit: size,
          sort: { createTime: -1 },
        },
      });

    return { total, rows: res.commentIds };
  }
}
