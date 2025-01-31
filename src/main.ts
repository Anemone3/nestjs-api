import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan'
import { CORS } from './config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configServer = app.get(ConfigService);

  app.use(morgan('dev'));
  //console.log(configServer.get('PORT'));

  app.enableCors(CORS);
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  await app.listen(configServer.get('PORT') ?? 3000, () => {
    console.log(`Server is running on port ${configServer.get('PORT') ?? 3000}`);
  });
}
bootstrap();
