FROM node:alpine
WORKDIR '/app'
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
COPY --from=0 /app/build /usr/share/nginx/html