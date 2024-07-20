import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ZodValidationPipe } from "src/zod-validation.pipe";
import { RegisterDTO, RegisterSchema } from "./dtos/register.dto";
import { LoginDTO, LoginSchema } from "./dtos/login.dto";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/auth/register")
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  async register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto);
  }

  @Post("/auth/login")
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(@Body() dto: LoginDTO) {
    return this.authService.login(dto);
  }
}
