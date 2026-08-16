# Multi-stage: Next static export → Caddy (корректный HTTP 404).
# Timeweb App Platform: тип приложения Dockerfile.
# Важно: один порт (8080). Два EXPOSE дают ~50% 502 на балансировке.

FROM node:22-alpine AS build
WORKDIR /app

ARG NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
ENV NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=$NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/out /srv

EXPOSE 8080
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
