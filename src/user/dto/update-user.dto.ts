import { IsOptional, IsString, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  catName?: string;

  @IsOptional()
  @IsString()
  ownerName?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  breeds?: string;

  @IsOptional()
  @IsString()
  description?: string;

  
  @IsOptional()
  @IsString()
  birthPlace?: string;

  @IsOptional()
  @IsString()
  profilePic?: string;
}
