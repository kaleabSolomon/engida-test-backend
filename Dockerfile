FROM node:20-alpine

WORKDIR /usr/src/app

# Install dependencies and tools
RUN apk update && apk add --no-cache netcat-openbsd \
    && corepack disable \
    && npm install -g pnpm

# Copy dependencies
COPY package.json pnpm-lock.yaml ./
# Install Node.js dependencies
RUN pnpm install --frozen-lockfile --loglevel verbose
# Copy the rest of the application files
COPY . .

# Build the project
RUN pnpm run build

# Expose the application port
EXPOSE 3333

# Set environment variable and start the application
ENV PORT=3333
