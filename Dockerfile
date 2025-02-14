# syntax=docker/dockerfile:1

# --- Build & Test Stage ---
  FROM node:22 AS builder
  WORKDIR /app
  
  # Copy package files and install all dependencies
  COPY package.json package-lock.json* ./
  RUN npm install
  
  # Copy the rest of the source code
  COPY . .
  
  # Run tests (this will fail the build if tests fail)
  RUN npm run test
  
  # Build the project
  RUN npm run build
  
  # --- Production Stage ---
  FROM node:22-alpine AS runtime
  WORKDIR /app
  LABEL org.opencontainers.image.title="ts-project-starter"
  
  # Install production-only dependencies
  COPY package.json package-lock.json* ./
  RUN npm install --only=production
  
  # Copy built files from the builder stage
  COPY --from=builder /app/dist ./dist
  
  EXPOSE 3000
  CMD ["node", "dist/index.js"]