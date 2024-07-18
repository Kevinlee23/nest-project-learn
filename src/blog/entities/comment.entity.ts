import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Blog } from './blog.entity';
import { Visitor } from 'src/visitor/entities/visitors.entity';

export type CommenDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' })
  blogId: Blog;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  parentId?: Comment;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Visitor' })
  authorId: Visitor;

  @Prop()
  isOriginal?: boolean = false;

  @Prop()
  createDate: string;

  @Prop()
  createTime: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
