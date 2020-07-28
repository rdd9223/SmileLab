FROM node:14.4.0-alpine as builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install --silent

COPY . .

CMD ["npm", "start"]