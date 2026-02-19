#Stage 1 Build
FROM node:24.13.0-alpine AS build

WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy project files
COPY . .

# Expose your backend port
EXPOSE 5000

# Start server
CMD ["node", "src/server.js"]
