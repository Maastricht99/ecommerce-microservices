import { Module } from "@nestjs/common";
import { AuthModule } from "./services/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import validateAndLoadConfig from "./config";
import { ProductCatalogModule } from './services/product-catalog/product-catalog.module';

const CORE_MODULES = [AuthModule, ProductCatalogModule];

const INFRA_MODULES = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [validateAndLoadConfig]
  })
]

@Module({
  imports: [
    ...CORE_MODULES,
    ...INFRA_MODULES,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
