import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { ProductCatalogService } from './product-catalog.service';
import { CreateProductDTO, CreateProductSchema } from './dtos/create-product.dto';
import { ZodValidationPipe } from 'src/zod-validation.pipe';

@Controller()
export class ProductCatalogController {

    constructor(
        private readonly productCatalogService: ProductCatalogService
    ) {}

    @Get("/products") 
    async  getAllProducts() {
        return this.productCatalogService.getAllProducts()
    }

    @Post("/products")
    @UsePipes(new ZodValidationPipe(CreateProductSchema))
    async createProduct(
        @Body() dto: CreateProductDTO
    ) {

    }
}
