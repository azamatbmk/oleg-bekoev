# Multi-stage: сборка Next (output: export) → раздача через Caddy с корректным HTTP 404.
# В Timeweb App Platform создайте приложение типа Dockerfile (не Next.js SPA).
#
# В панели Timeweb задайте переменную NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
# (или передайте как build-arg) — иначе форма на статике не отправится.

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

EXPOSE 80
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
