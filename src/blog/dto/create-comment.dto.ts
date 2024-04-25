import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsNotEmpty()
  blogId: string;

  @ApiProperty()
  @IsString()
  parentId?: string;

  @ApiProperty()
  @IsString()
  parentName?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  authorName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  authorEmail: string;

  @ApiProperty()
  @IsBoolean()
  isOriginal: boolean;
}
