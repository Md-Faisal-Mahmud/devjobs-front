FROM node:20-alpine3.17 as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production
FROM nginx:1.15.8-alpine
COPY default.conf /etc/nginx/conf.d
COPY --from=build /usr/src/app/dist/devjobs-front/browser/ /usr/share/nginx/html