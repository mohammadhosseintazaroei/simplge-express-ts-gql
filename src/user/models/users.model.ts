import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

@ObjectType({ description: "The Users model" })
export class Users {
  @Field(() => ID)
  id: string;

  @Field()
  @Property()
  first_name: String;

  @Field()
  @Property()
  last_name: String;

  @Field()
  @Property({ required: true })
  mobile_number: String;
}

export const UsersModel = getModelForClass(Users);
