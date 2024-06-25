import { Body, Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('getStsToken')
  async getStsToken(
    @Body() data: { accessKeyId: string; accessKeySecret: string },
  ) {
    const result = await this.uploadService.getToken(data);

    return {
      AccessKeyId: result.credentials.AccessKeyId,
      AccessKeySecret: result.credentials.AccessKeySecret,
      SecurityToken: result.credentials.SecurityToken,
    };
  }
}
