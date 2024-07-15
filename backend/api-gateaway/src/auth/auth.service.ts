import { Injectable } from "@nestjs/common";
import { RegisterDTO } from "./dto/register.dto";
import { HttpService } from "@nestjs/axios";
import { map } from "rxjs/operators";
import { ConfigService } from "@nestjs/config";
import { Env } from "src/config";

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<Env>,
    private readonly httpService: HttpService
  ) {}

  async register(dto: RegisterDTO) {
    const { auth: { host, port } } = this.configService.get("service", { infer: true })

    return this.httpService.post(`http://${host}:${port}/register`, dto)
      .pipe(
        map(res => res.data)
      );
  }
}
