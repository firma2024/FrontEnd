FROM node:16-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

RUN npm run build --prod

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
