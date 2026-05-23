# WS-Rooms Chat Server

WebSocket-based chat server with user registration and room support.

### Features

- User registration and authentication

- WebSocket connections for real-time chat

- Multi-room support

### Tech Stack

- Node.js

- TypeScript

- PostgreSQL

- WebSocket (`ws` library)

### Node modules

- express
- pg
- jsonwebtoken
- bcrypt
- dotenv
- ws
- zod
- ts-node-dev

## Dev Dependencies

- typescript
- ts-node-dev
- @types/express
- @types/node
- @types/pg
- @types/jsonwebtoken
- @types/bcrypt
- @types/ws
- @types/dotenv

### Setup

1. Create a `.env` file with your database credentials.
2. Run `npm install` to install dependencies.
3. Run `npm install -D typescript ts-node-dev` to install dev dependencies if not already installed
4. Config `package.json` file
5. Run `npm run dev` to start listening

**Tip**: Run the frontend and backend on the same host and port (via proxy) to handle credentials and cookies properly during the WebSocket handshake

Package.json:

```Package.json
{
  "name": "ws-rooms",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "ts-node-dev server.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^6.0.0",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "pg": "^8.20.0",
    "ws": "^8.20.0",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@types/bcrypt": "^6.0.0",
    "@types/dotenv": "^6.1.1",
    "@types/express": "^5.0.6",
    "@types/jsonwebtoken": "^9.0.10",
    "@types/node": "^25.5.0",
    "@types/pg": "^8.20.0",
    "@types/ws": "^8.18.1",
    "ts-node-dev": "^2.0.0",
    "typescript": "^6.0.2"
  }
}
```
