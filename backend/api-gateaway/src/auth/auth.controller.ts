import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ZodValidationPipe } from "src/zod-validation.pipe";
import { RegisterDTO, RegisterSchema } from "./dto/register.dto";
import { LoginDTO, LoginSchema } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  async register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto);
  }

  @Post("/login")
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Body() dto: LoginDTO) {
    return this.authService.login(dto);
  }
}
