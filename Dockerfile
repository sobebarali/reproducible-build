FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./
RUN npm ci

# Copy source files and build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Create a clean production image
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

# Copy only the built artifacts
COPY --from=builder /app/dist ./dist

# Add build info to the image metadata
COPY --from=builder /app/dist/build-info.json ./

# Define startup command
CMD ["node", "dist/index.js"] 