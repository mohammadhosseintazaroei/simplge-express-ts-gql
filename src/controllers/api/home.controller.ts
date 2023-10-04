import { Get, Route, Tags } from "tsoa";

@Route("/")
@Tags("Home")
export class HomeController {
  @Get("/")
  public async home(userId: string): Promise<any> {
    return { message: "welcome home" };
  }
}
