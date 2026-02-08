ARG PB_VERSION=latest

FROM node:lts-alpine AS builder

WORKDIR /app

COPY ui/package*.json ./
RUN npm ci

COPY ui/ ./
RUN npm run build

FROM ghcr.io/1024mb/pocketbase:${PB_VERSION}

WORKDIR /app

COPY --from=builder /app/dist/ /app/pb_public/
COPY pb/pb_hooks/*.js /app/pb_hooks/
COPY pb/pb_migrations/*.js /app/pb_migrations_app

COPY --chmod=755 entrypoint.sh /usr/local/bin/entrypoint-wrapper.sh

ENTRYPOINT ["/usr/local/bin/entrypoint-wrapper.sh"]
