FROM node:14.4.0-alpine as builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@2.1.3 -g --silent

COPY . .

CMD ["npm", "start"]