# Multi-stage: Next static export → Caddy (корректный HTTP 404).
# Timeweb App Platform: тип приложения Dockerfile.

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

# Оба порта: платформа может проксировать на любой из них
EXPOSE 80 8080
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
