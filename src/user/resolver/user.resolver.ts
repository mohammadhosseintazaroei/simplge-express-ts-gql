import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserDto } from "./user.dto";
import { Users, UsersModel } from "../models/users.model";

@Resolver()
export class UsersResolver {
  @Query((_returns) => Users, { nullable: false })
  async getUserById(@Arg("id") id: string) {
    return await UsersModel.findById({ _id: id });
  }

  @Query(() => [Users])
  async getAllUses() {
    return await UsersModel.find();
  }

  @Mutation(() => Users)
  async createUser(
    @Arg("data") { first_name, last_name, mobile_number }: CreateUserDto
  ): Promise<Users> {
    const userResult = (
      await UsersModel.create({
        mobile_number,
        first_name,
        last_name,
      })
    ).save();
    return userResult;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    console.log(id);
    await UsersModel.deleteOne({ _id: id });
    return true;
  }
}
