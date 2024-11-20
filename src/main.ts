import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/Global.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Apply the global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());
  
  await app.listen(parseInt(process.env.APP_PORT, 10));
}
bootstrap();
