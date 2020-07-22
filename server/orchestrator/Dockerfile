FROM node:12.0-alpine

WORKDIR /var/www/entertainme/server/orchestrator

ENV PORT=3000

COPY package.json package-lock.json ./

# RUN npm install -g node

RUN npm install && npm cache clean --force

COPY . .

CMD ["node", "app.js"]