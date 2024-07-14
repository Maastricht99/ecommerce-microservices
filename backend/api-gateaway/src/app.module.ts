import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import validateAndLoadConfig from "./config";

const CORE_MODULES = [AuthModule];

const INFRA_MODULES = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [validateAndLoadConfig]
  })
]

@Module({
  imports: [
    ...CORE_MODULES,
    ...INFRA_MODULES
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
