# Svelte Serverless Postgres

A comprehensive Svelte starter template featuring Tailwind CSS v4.0 and Neon Serverless Postgres.

## Create project

Clone the repository:

```bash
git clone https://github.com/sahelars/svelte-serverless-postgres.git

cd svelte-serverless-postgres
```

## Development setup

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

## Neon setup

Sign up for [Neon](https://neon.tech):

```
https://neon.tech
```

Get [postgres database url from Neon](https://neon.tech/docs/connect/connect-from-any-app) and add to `.env` file:

```
DATABASE_URL="postgresql://username:password@host:port/database_name"
```

Create tables via Neon's SQL editor:

```sql
CREATE TABLE app_user (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

CREATE TABLE user_session (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES app_user(id),
    expires_at TIMESTAMPTZ NOT NULL
);
```

Hash password:

```js
import bcrypt from 'bcryptjs';

const password = 'yourpassword123';
const hash = await bcrypt.hash(password, 10);

console.log(hash);
```

Create test user with hashed password via Neon's SQL editor:

```sql
INSERT INTO app_user (username, password_hash)
VALUES ('yourusername', '$2a$10$wG7LJ6ih0HeOqWZLsw6beODCEK9x/B2TOxvBPLq8tAD9Efp7C4OGa');
```

## Build and preview

Create the production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```
