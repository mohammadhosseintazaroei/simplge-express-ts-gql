import { InputType, Field } from "type-graphql";
import { Length, MaxLength } from "class-validator";
import { Users } from "../models/users.model";

@InputType()
export class CreateUserDto implements Partial<Users> {
  @Field()
  mobile_number: string;

  @Field()
  first_name: string;

  @Field()
  @Length(1, 3)
  last_name: String;
}
