// src/controllers/UserController.ts

import { Route, Get, Post, Controller, Body } from "tsoa";
import { User } from "../types/interfaces/user/user-model.interface";

@Route("user")
export class UserController extends Controller {
  @Get()
  public async getUser(): Promise<any> {
    return { message: "Fetch a specific user." };
  }

  @Get("all")
  public async getAllUsers(): Promise<any> {
    return { message: "Fetch all users." };
  }

  @Post("create")
  public async createUser(@Body() requestBody: User): Promise<any> {
    return { user: requestBody, message: "User created successfully." };
  }
}
