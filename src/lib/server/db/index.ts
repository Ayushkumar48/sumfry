import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { GoogleGenAI } from '@google/genai';
import { env } from '$env/dynamic/private';
import { GEMINI_API_KEY } from '$env/static/private';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema });
export const gemini = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
