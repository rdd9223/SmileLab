FROM node:14.4.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json ./

RUN npm install -g nodemon \ && npm install

COPY . .

CMD ["npm", "run", "dev"]