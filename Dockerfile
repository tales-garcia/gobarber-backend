FROM node:10

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY /src ./src
COPY babel.config.js ./

RUN npm install

RUN npm run build

RUN rm -r tmp/javascript

RUN mkdir /tmp/uploads

ENTRYPOINT ["npm", "run", "prod:server"]
