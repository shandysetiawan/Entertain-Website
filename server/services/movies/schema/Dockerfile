FROM node:12.0

WORKDIR /var/www/entertainme/server/services/movies

ENV PORT=3001

COPY package.json package-lock.json ./

RUN npm install -g nodemon

RUN npm install && npm cache clean --force

COPY . .

CMD ["nodemon", "app.js"]