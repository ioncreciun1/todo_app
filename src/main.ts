import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/Global.filter';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Enable the ValidationPipe globally
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,             // Strips properties that are not in the DTO
      forbidNonWhitelisted: true,  // Throws an error if extra properties are found in the request
      transform: true,             // Automatically transforms payloads to DTO types (e.g., string to number)
    }));

  // Apply the global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());
  
  await app.listen(parseInt(process.env.APP_PORT, 10));
}
bootstrap();
