import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from 'src/config';
import { map } from "rxjs/operators";
import { CreateProductDTO } from './dtos/create-product.dto';

@Injectable()
export class ProductCatalogService {

    constructor(
        private readonly configService: ConfigService<Env>,
        private readonly httpService: HttpService
      ) {}

    async getAllProducts() {
        const { productCatalog: { host, port } } = this.configService.get("service", { infer: true })
        return this.httpService.get<any[]>(`http://${host}:${port}/products`)
        .pipe(
          map(res => res.data)
        );
    }

    async createProduct(token: string, dto: CreateProductDTO) {
        const { productCatalog: { host, port } } = this.configService.get("service", { infer: true })
        return this.httpService.post<string>(`http://${host}:${port}/products`, dto, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .pipe(
          map(res => res.data)
        );
    }
}
