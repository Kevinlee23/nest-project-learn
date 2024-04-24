import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Query,
  UseInterceptors,
  Get,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { Comment } from './entities/comment.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseInterceptors(TransformInterceptor<null>)
  @Post('/insert')
  async insert(@Body() comment: CreateCommentDto) {
    const res = await this.commentService.insert(comment);

    if (res) {
      return { data: null, message: '评论成功' };
    } else {
      throw InternalServerErrorException;
    }
  }

  @UseInterceptors(TransformInterceptor<Comment[]>)
  @Get('/list')
  async list(@Query('blogId') blogId: string) {
    try {
      const data: Comment[] = await this.commentService.list(blogId);

      return { data, message: '查询成功' };
    } catch (error) {
      console.error(error);

      throw InternalServerErrorException;
    }
  }
}
