import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  FIREBASE_PROJECT_ID: z.string().min(1, 'Firebase Project ID is required'),
  FIREBASE_CLIENT_EMAIL: z.string().email('Valid Firebase Client Email is required'),
  FIREBASE_PRIVATE_KEY: z.string().min(1, 'Firebase Private Key is required'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Invalid environment variables:');
  console.error(_env.error.format());
  process.exit(1);
}

// Handle escaped newlines in the private key
const privateKey = _env.data.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

export const env = {
  ..._env.data,
  FIREBASE_PRIVATE_KEY: privateKey,
};
