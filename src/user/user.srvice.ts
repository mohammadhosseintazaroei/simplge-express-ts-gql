import { IUser } from "../types/interfaces/user/user-model.interface";
import { CreateUserDto } from "./dto/user.dto";
import { UsersModel } from "./entities/users.entity";

export type UserCreationParams = Pick<IUser, "mobileNumber" | "firstName">;
interface getAllUsers {
  users: IUser[];
}
class UsersService {
  async getAll(): Promise<getAllUsers> {
    const users = await UsersModel.find({});
    return {
      users: users,
    };
  }

  async create(user: CreateUserDto): Promise<any> {
    const createUserResult = await UsersModel.create({
      first_name: user.firstName,
      last_name: user.lastName,
      mobile_number: user.mobileNumber,
    });
    return {
      message: "created successfuly",
      user: createUserResult,
    };
  }
}

export const UsersServices = new UsersService();
