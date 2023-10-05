import { IsOptional, IsString, IsEmail, Length } from "class-validator";
export class CreateUserDto {
  @IsOptional()
  id?: number;

  @IsString()
  @Length(2, 30)
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  mobileNumber: string;
}
