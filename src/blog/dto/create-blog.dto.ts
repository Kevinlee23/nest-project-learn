import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import type { Music } from '../entities/blog.entity';

export class CreateBlogDto {
  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNumber()
  likeNum?: number = 0;

  @ApiProperty()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsArray()
  imageList?: string[];

  @ApiProperty()
  @IsArray()
  musicList?: Music[];

  @ApiProperty()
  @IsArray()
  commentIds?: string[];
}
