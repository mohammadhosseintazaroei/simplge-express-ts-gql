import { InputType, Field } from "type-graphql";
import { Length, MaxLength } from "class-validator";
import { Categories } from "../models/categories.model";

@InputType()
export class CreateCategory implements Partial<Categories> {
  @Field()
  name: string;

  @Field()
  @Length(1, 3)
  description: String;
}
