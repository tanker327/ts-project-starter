# TS Project Starter

A minimal starter project built with [TypeScript](https://www.typescriptlang.org/). It leverages [Zod](https://github.com/colinhacks/zod) for environment variable validation, [Winston](https://github.com/winstonjs/winston) (with [winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file)) for logging, and [Jest](https://jestjs.io/) for testing. The provided Dockerfile uses a multi-stage build that runs tests before creating a slim production image.

## Features

- **TypeScript Setup:** Uses ES2020 with CommonJS.
- **Environment Validation:** Validates and transforms environment variables via Zod.
- **Logging:** Configured with Winston. In production, logs are written to rotating files via winston-daily-rotate-file.
- **Testing:** Automated tests using Jest.
- **Linting:** Enforced with ESLint.
- **Docker Multi-Stage Build:** Ensures code quality by running tests and building in a builder stage; production runtime image is minimal.

## Project Structure

```
.
├── src
│   ├── index.ts         # Main application entry point
│   ├── logger.ts        # Logger configuration (Winston + daily rotate)
│   └── setting.ts       # Environment variable validation using Zod
├── tests
│   └── setting.test.ts  # Test cases for the settings module
├── .env                 # Environment variables file
├── .gitignore           # Git ignore file for node_modules, dist, logs, etc.
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration file
├── Dockerfile           # Multi-stage Docker build configuration
└── README.md            # Project documentation
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/tanker327/ts-project-starter.git
cd ts-project-starter
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

or using Yarn:

```bash
yarn install
```

### 3. Create a `.env` File

Create a `.env` file in the project root with content similar to:

```env
NODE_ENV=dev
PORT=3000
DEBUG_MODE=false
LOG_LEVEL=debug
SHOULD_LOG_IN_FILE=true
```

## Running the Application

### Development

Build and start the application:

```bash
npm run start
```

This command compiles the TypeScript files and runs the compiled JavaScript.

### Testing

Run tests with:

```bash
npm run test
```

Tests ensure your configuration and modules work as expected before production deployment.

### Linting

Check your code for linting errors:

```bash
npm run lint
```

Fix linting errors automatically:

```bash
npm run lint:fix
```

### Code Formatting

We use [Prettier](https://prettier.io) for automatic code formatting. A configuration file (.prettierrc) is provided in the project.

To format your code automatically, run:

```bash
npm run format
```

This will format all files according to our Prettier rules.

## Docker

This project includes a multi-stage Dockerfile that first runs tests and builds the application, then creates a minimal production image.

### Building the Docker Image

Build the Docker image and tag it:

```bash
docker build -t ts-project-starter:latest .
```

### Running the Docker Container

Run the container:

```bash
docker run  ts-project-starter:latest
```

## Logger Configuration

The logger is defined in `src/logger.ts` and uses:

- **Console Transport:** For development logs.
- **Daily Rotate File Transport:** For production logs. Logs are rotated daily (or based on size, if desired) and stored under `logs/app-%DATE%.log`.

This setup allows you to have both viewable console logs during development and persistent log files in production.

## Environment Variables

The application validates and uses the following environment variables:

- **NODE_ENV:** The current environment (`dev`, `uat`, or `prod`). Default is `dev`.
- **PORT:** The port on which the application listens. Default is `3000`.
- **DEBUG_MODE:** Enables additional debugging (expects `"true"` or `"false"`).
- **LOG_LEVEL:** Logging level (e.g., `debug`, `info`, `warn`, `error`). Default is `debug`.
- **SHOULD_LOG_IN_FILE:** When `true`, enables logging to file via winston-daily-rotate-file.

## License

MIT License
