##### Stage 1
FROM node:12.7.0-alpine as build-stage

WORKDIR /app

COPY package*.json /app/
# COPY cypress ./cypress

RUN npm i -g @angular/cli@8.3.0
RUN npm install

COPY ./ /app/

ARG configuration=production

RUN npm run build -- --output-path=./dist/out --prod


# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
