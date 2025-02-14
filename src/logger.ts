import { createLogger, format, transports } from "winston";
import { env } from "./setting"; // using NODE_ENV to check production
import DailyRotateFile from "winston-daily-rotate-file";
import Transport from "winston-transport";
const { combine, timestamp, json, colorize, printf } = format;

/**
 * Here's a sample formatter combining colorized output in dev
 * and JSON for structured logs in production.
 */
const devFormat = combine(
  colorize(),
  printf(({ level, message, timestamp }) => {
    return `${timestamp ? `[${timestamp}] ` : ""}${level}: ${message}`;
  })
);

const prodFormat = combine(
  timestamp(),
  json() // structured JSON logs
);

const transportsOptions: Transport[] = [
  new transports.Console()
];

if (env.NODE_ENV === "prod" || env.SHOULD_LOG_IN_FILE) {
  transportsOptions.push(
    new DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d"
    })
  );
}

export const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  // e.g. debug, info, warn, error
  format: env.NODE_ENV === "prod" ? prodFormat : combine(timestamp(), devFormat),
  defaultMeta: { service: "app-service" },
  transports: transportsOptions
});