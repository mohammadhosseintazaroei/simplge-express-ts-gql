import { Get, Route, Tags } from "tsoa";

@Route("/")
@Tags("Home")
export class HomeController {
  @Get("")
  public async home(): Promise<any> {
    return { message: "welcome home" };
  }
}
