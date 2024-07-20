import { Injectable } from "@nestjs/common";
import { RegisterDTO } from "./dtos/register.dto";
import { HttpService } from "@nestjs/axios";
import { map } from "rxjs/operators";
import { ConfigService } from "@nestjs/config";
import { Env } from "src/config";
import { LoginDTO } from "./dtos/login.dto";
import { LoginResponse, RegisterResponse } from "./responses";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<Env>,
    private readonly httpService: HttpService
  ) {}

  async register(dto: RegisterDTO) {
    const { auth: { host, port } } = this.configService.get("service", { infer: true })
    return this.httpService.post<RegisterResponse>(`http://${host}:${port}/register`, dto)
      .pipe(
        map(res => res.data)
      );
  }

  async login(dto: LoginDTO) {
    const { auth: { host, port } } = this.configService.get("service", { infer: true })
    return this.httpService.post<LoginResponse>(`http://${host}:${port}/login`, dto)
      .pipe(
        map(res => res.data)
      );
  }

}
