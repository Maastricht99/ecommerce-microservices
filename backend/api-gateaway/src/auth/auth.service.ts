import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  async register(dto: any) {
    return {
      token: "xxx",
    };
  }
}
