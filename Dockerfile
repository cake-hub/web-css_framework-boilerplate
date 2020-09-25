FROM node:10
WORKDIR /var/www/html
COPY . .

ENV HOST 0.0.0.0
EXPOSE 5000
CMD ["npm", "start"]