import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './config';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configServer = app.get(ConfigService);

  app.use(morgan('dev'));
  console.log(configServer.get('PORT'));

  app.enableCors(CORS);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  //Swagger
  const configSwagger = new DocumentBuilder()
    .setTitle('Api kokostore')
    .setDescription('Documentanción aqkin api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(configServer.get('PORT') ?? 3000, () => {
    console.log(`Server is running on port ${configServer.get('PORT') ?? 3000}`);
  });
}
bootstrap();
