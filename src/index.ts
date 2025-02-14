import { logger } from "./logger";
import { env } from "./setting";
logger.info("Hello from ts-project-starter!");

console.log("NODE_ENV: ", env.NODE_ENV);
console.log("PORT: ", env.PORT);
console.log("DEBUG_MODE: ", env.DEBUG_MODE);
