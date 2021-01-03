FROM node:10

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY /src ./src

RUN npm install

RUN npm run build

RUN npm run js:bundle

RUN mkdir dist/tmp

RUN mkdir dist/tmp/uploads

ENTRYPOINT ["npm", "run", "prod:server"]
