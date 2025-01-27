import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";


//? talvez se deba quitar esto para simplificar los tests
@Global()
@Module({

  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}