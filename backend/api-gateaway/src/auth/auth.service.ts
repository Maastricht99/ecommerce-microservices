import { Injectable } from "@nestjs/common";
import { RegisterDTO } from "./dto/register.dto";

@Injectable()
export class AuthService {
  async register(dto: RegisterDTO) {
    return dto;
  }
}
