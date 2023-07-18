import chalk from "chalk";

import sendError from './utils/error.js'
import { connectToDatabase } from "./database/createConnection.js";
import logger from "./utils/logger.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 3000;

const database = connectToDatabase();
if (database.status == 'unsuccessful connection') logger.error("unsuccessful database connection");

const server = app.listen(PORT, async () => {
  logger.success(`🚀 Server started on ${chalk.yellowBright.underline("http://localhost:" + PORT)}`);
  logger.info(`The pid is ${chalk.redBright.underline(process.pid)} and date ${chalk.blueBright.underline(new Date().toLocaleTimeString())}`)
});


process.on("SIGINT", () => {
  server.close();
  logger.warning("finished application");
  process.exit();
});
