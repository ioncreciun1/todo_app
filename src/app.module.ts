import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import databaseConfig, { ensureDatabaseExists } from './config/database.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
      {
        const dbConfig = configService.get('database');
        await ensureDatabaseExists(dbConfig); // Run the check and create if needed
        return dbConfig;
      }
    }),

    TodoModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule { }
