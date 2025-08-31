// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   username TEXT UNIQUE NOT NULL,
//   rhythm_hash TEXT NOT NULL,
//   created_at TIMESTAMP DEFAULT NOW(),
//   updated_at TIMESTAMP DEFAULT NOW()
// );
// CREATE TABLE tasks (
//     id SERIAL PRIMARY KEY,
//     user_id INT,
//     title VARCHAR(255) NOT NULL,
//     description TEXT,
//     status VARCHAR(20) DEFAULT 'pending', -- e.g. 'pending', 'in_progress', 'done'
//     priority INT DEFAULT 0,               -- e.g. 0 = low, 1 = medium, 2 = high
//     due_date DATE,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// ignore above its easier to store them here so i dont forget the columns

import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});
