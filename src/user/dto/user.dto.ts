import {
  IsOptional,
  IsString,
  IsEmail,
  Length,
  MaxLength,
} from "class-validator";
export class CreateUserDto {
  @IsOptional()
  id?: number;

  @IsString()
  @Length(2, 30)
  firstName: string;

  @IsString()
  @Length(2, 30)
  lastName: string;

  @IsString()
  mobileNumber: string;
}
