import { IsNotEmpty } from 'class-validator';

export class UploadImgDto {
  @IsNotEmpty()
  img: string;

  @IsNotEmpty()
  description: string;
}
