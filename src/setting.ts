import { z } from "zod";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const EnvSchema = z.object({
  NODE_ENV: z.enum(["dev", "uat", "prod"]).default("dev"),
  PORT: z.string().transform((val) => parseInt(val, 10)).default("3000"),
  DEBUG_MODE: z.string().optional().transform((val) => val === "true"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
  SHOULD_LOG_IN_FILE: z.string().optional().transform((val) => val !== "false"),
  // ... add more as needed
});

const parsedEnv = EnvSchema.parse(process.env);

export const env = {
  ...parsedEnv,
  PORT: Number(parsedEnv.PORT),

  isProd: parsedEnv.NODE_ENV === "prod",
  isDev: parsedEnv.NODE_ENV === "dev",
  isUat: parsedEnv.NODE_ENV === "uat",
};