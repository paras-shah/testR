FROM node:12.2.0-alpine as build
COPY rubrik /app
ENV PATH /app/node_modules/.bin:$PATH
WORKDIR /app
RUN npm install
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/web/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
