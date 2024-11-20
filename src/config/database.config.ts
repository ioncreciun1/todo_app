import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Client } from 'pg';

// Function to check and create the database if it doesn't exist
export async function ensureDatabaseExists(config: { host: string, port: number, username: string, password: string, database: string }) {
  const { host, port, username, password, database } = config;

  const client = new Client({
    host,
    port,
    user: username,
    password,
    database: 'postgres', // Connect to the default 'postgres' database for administrative tasks
  });

  try {
    await client.connect();

    // Check if the database exists
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [database],
    );

    if (result.rowCount === 0) {
      console.log(`Database "${database}" does not exist. Creating...`);
      await client.query(`CREATE DATABASE "${database}"`);
      console.log(`Database "${database}" created successfully.`);
    } else {
      console.log(`Database "${database}" already exists.`);
    }
  } catch (error) {
    console.error('Error checking/creating database:', error);
    throw error; // Propagate the error to fail the app if DB creation fails
  } finally {
    await client.end();
  }
}

export default registerAs('database', (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.TODO_DB_NAME || 'todo_db',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: process.env.TYPEORM_SYNC === 'true', // Disable in production!
}));
