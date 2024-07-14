import { Injectable } from "@nestjs/common";
import { RegisterDTO } from "./dto/register.dto";
import { HttpService } from "@nestjs/axios";
import { map } from "rxjs/operators";

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async register(dto: RegisterDTO) {
    return this.httpService.post("http://localhost:3001/register", dto)
      .pipe(
        map(res => res.data)
      );
  }
}
