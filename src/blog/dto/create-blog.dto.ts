import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNumber()
  likeNum?: number;

  @ApiProperty()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsArray()
  imageList?: string[];

  @ApiProperty()
  @IsArray()
  musicList?: string[];

  @ApiProperty()
  @IsArray()
  commentIds?: string[];
}
