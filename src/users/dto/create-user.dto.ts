import { Gender } from '@prisma/client';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  birthDate: string;

  @IsEnum(Gender)
  gender: Gender;
}
