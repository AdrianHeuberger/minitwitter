# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=4000

EXPOSE 4000

CMD ["node", ".output/server/index.mjs"]
