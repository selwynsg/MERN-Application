# Dockerfile
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
ENV MONGO_URL mongodb://mongo:27017/subs
EXPOSE 28017

CMD ["npm", "run", "devStart"]
