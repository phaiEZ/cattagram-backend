import { IsNotEmpty } from 'class-validator';

export class UploadImgDto {
  @IsNotEmpty()
  profilePic: string;

  @IsNotEmpty()
  description: string;
}
