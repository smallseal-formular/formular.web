FROM node:lts-alpine as builder
WORKDIR /app
COPY formular.web/ /app

# build eventhub-web
RUN npm ci &&\
    npm run build -- --dest publish

FROM nginx:stable
COPY --from=builder /app/publish /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf