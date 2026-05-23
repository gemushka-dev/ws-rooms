import { createServer } from "http";
import { database } from "./src/models/database/init";
import { app } from "./app";
import { setupWs } from "./src/ws/wsSetup";

const PORT: number = 3500;

const server = createServer(app);

setupWs(server);

async function start() {
  try {
    await database.init();
    server.listen(PORT, () => {
      console.info(`➜  Local: http://localhost:${PORT}`);
      console.info(`➜  press ^C to stop`);
    });
  } catch (e: unknown) {
    console.error(`Something went wrong. Error: ${e}`);
    process.exit(1);
  }
}

start();
