import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  environment: process.env.NODE_ENV || 'development',
  appName: process.env.APP_NAME || 'NestJS ToDo App',
  version: process.env.APP_VERSION || '1.0.0',
}));