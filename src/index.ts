import "./loadEnvironment.js";
import createdebug from "debug";
import { app } from "./server/index.js";
import chalk from "chalk";

export const debug = createdebug("quefem-api:root");

export const port = process.env.PORT ?? 4000;

app.listen(port, () => {
  debug(chalk.blueBright(`listening on http://localhost:${port}`));
});
