import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from 'src/common/validators';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  @IsString()
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  @IsString()
  @Match('password', {
    message: 'Password confirmation does not match password',
  })
  passwordConfirm: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\s'-]+$/, {
    message:
      'Firstname can only contain letters, spaces, hyphens, and apostrophes',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z\s'-]+$/, {
    message:
      'lastName can only contain letters, spaces, hyphens, and apostrophes',
  })
  lastName: string;
}
