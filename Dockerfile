# Etapa de construcción
FROM node:14.17.1 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa de producción
FROM nginx:1.21.1-alpine
COPY --from=build /usr/src/app/dist/my-app /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf