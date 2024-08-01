import { IsNotEmpty } from 'class-validator';

export class CreateCatxDto {
  @IsNotEmpty()
  description: string;
}
