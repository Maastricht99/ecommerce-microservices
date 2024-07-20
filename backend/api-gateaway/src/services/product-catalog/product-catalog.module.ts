import { Module } from '@nestjs/common';
import { ProductCatalogController } from './product-catalog.controller';
import { ProductCatalogService } from './product-catalog.service';

@Module({
  controllers: [ProductCatalogController],
  providers: [ProductCatalogService]
})
export class ProductCatalogModule {}
