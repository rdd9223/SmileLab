FROM nikolaik/python-nodejs:latest
EXPOSE 4000
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json ./

RUN npm install -g nodemon \ && npm install

COPY . .

CMD ["npm", "run", "dev"]