# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY src/package*.json ./
RUN npm ci
COPY src/. .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app
COPY src/package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --from=builder /app/build ./build

EXPOSE 3000
CMD ["node", "build"]