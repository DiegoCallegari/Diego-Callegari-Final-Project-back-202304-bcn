import "./loadEnvironment.js";
import createdebug from "debug";
import { app } from "./server/index.js";
import chalk from "chalk";
import connectToDatabase from "./database/connectToDataBase.js";

export const debug = createdebug("quefem-api:root");

const port = process.env.PORT ?? 4000;

const mongoDbConnection = process.env.MONGODB_CONNECTION;

if (!mongoDbConnection) {
  debug(chalk.red("Missing environmental variables. Exiting..."));
  process.exit(1);
}

app.listen(port, () => {
  debug(chalk.blueBright(`listening on http://localhost:${port}`));
});

try {
  await connectToDatabase(mongoDbConnection);

  debug(chalk.blue("Connected to database"));
} catch (error: unknown) {
  debug(`Error connecting to database: ${chalk.red((error as Error).message)}`);
}
