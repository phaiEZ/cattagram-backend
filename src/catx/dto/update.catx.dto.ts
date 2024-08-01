import { IsNotEmpty } from 'class-validator';

export class UpdateCatxDto {
  @IsNotEmpty()
  description: string;
}
