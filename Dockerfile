# Etapa de construcción
FROM node:14 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:1.19.0-alpine AS production
COPY --from=build /app/dist/my-app /usr/share/nginx/html
