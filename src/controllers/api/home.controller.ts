import { Get, Route, Tags } from "tsoa";

@Route("home")
@Tags("Home")
export class HomeController {
  @Get("{dd}")
  public async home(dd: string): Promise<any> {
    return { message: "welcome home" };
  }
}
