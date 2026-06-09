# Stage 1: Build the Angular application with SSR
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application for production with SSR
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine AS run

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S angular -u 1001

# Copy built application from build stage
COPY --from=build /app/dist/adrian-cabello ./dist/adrian-cabello
COPY --from=build /app/server-runner.mjs ./server-runner.mjs
COPY --from=build /app/package*.json ./

# Set ownership
RUN chown -R angular:nodejs /app

USER angular

# Expose port (default: 4000, configurable via PORT env)
EXPOSE 4000

# Environment variables
ENV PORT=4000
ENV NODE_ENV=production

# Start the browser app server
CMD ["node", "server-runner.mjs"]
