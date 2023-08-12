FROM node:18.14-alpine3.16
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --production
COPY ./dist .
EXPOSE 8080
CMD ["node", "src/index.js"]