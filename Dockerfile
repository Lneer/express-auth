FROM node:18.14-alpine3.16
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY ./dist .
EXPOSE 8080
CMD ["node", "src/index.js"]