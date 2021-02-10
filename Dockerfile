FROM node:10

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY /src ./src

RUN npm install

RUN npm run build

RUN mkdir /tmp/uploads

ENTRYPOINT ["npm", "run", "prod:server"]
