// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   username TEXT UNIQUE NOT NULL,
//   rhythm_hash TEXT NOT NULL,
//   created_at TIMESTAMP DEFAULT NOW(),
//   updated_at TIMESTAMP DEFAULT NOW()
// );

// ignore above its easier to store them here so i dont forget the columns

import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});
