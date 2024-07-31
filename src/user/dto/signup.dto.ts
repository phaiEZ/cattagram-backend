import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password mustMinimum eight characters, at least one letter and one number.',
  })
  password: string;

  @IsNotEmpty()
  catName: string;

  @IsNotEmpty()
  ownerName: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  breeds: string;

  // @IsOptional()
  // description?: string;
}
