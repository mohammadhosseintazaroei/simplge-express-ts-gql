import { Get, Route, Tags } from "tsoa";

@Route("users")
@Tags("User")
export class UserController {
  @Get("{userId}")
  public async getUser(userId: string): Promise<any> {
    return { id: userId, name: "user-name" };
  }
}
