FROM node:12.0-alpine

WORKDIR /var/www/entertainme/server/services/tv_series

ENV PORT=3002

COPY package.json package-lock.json ./

# RUN npm install -g nodemon

RUN npm install && npm cache clean --force

COPY . .

CMD ["node", "app.js"]