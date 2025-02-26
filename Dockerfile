FROM node:22 AS builder

WORKDIR /app
COPY . /app

RUN npm rebuild
RUN npm ci --omit dev

FROM node:22-alpine
COPY --from=builder /app /app
WORKDIR /app

EXPOSE 7777
