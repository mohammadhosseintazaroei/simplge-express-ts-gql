import {
  Route,
  Get,
  Post,
  Controller,
  Body,
  Middlewares,
  Example,
  Consumes,
} from "tsoa";
import { CreateUserDto } from "./dto/user.dto";
import { UsersServices } from "./user.srvice";
import { UseValidation } from "../custom-decorators/usevalidation.decorator";

@Route("user")
export class UserController extends Controller {
  @Get("all")
  public async getAllUsers(): Promise<any> {
    this.setStatus(201);
    return UsersServices.getAll();
  }

  @Post("create")
  @Consumes("application/x-www-form-urlencoded")
  @UseValidation(CreateUserDto)
  public async createUser(@Body() requestBody: CreateUserDto): Promise<any> {
    this.setStatus(201);
    return UsersServices.create(requestBody);
  }
}
