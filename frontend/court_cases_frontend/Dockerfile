FROM node:16 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
EXPOSE 3000 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]