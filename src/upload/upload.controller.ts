import { Body, Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Public()
  @Post('getStsToken')
  async getStsToken(
    @Body() data: { accessKeyId: string; accessKeySecret: string, roleKey:string },
  ) {
    const result = await this.uploadService.getToken(data);

    return {
      AccessKeyId: result.credentials.AccessKeyId,
      AccessKeySecret: result.credentials.AccessKeySecret,
      SecurityToken: result.credentials.SecurityToken,
      Expiration: result.credentials.Expiration
    };
  }
}
