FROM node:12 as building
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --only=prod
COPY ./dist .

FROM node:12-alpine
WORKDIR /usr/src/app
COPY --from=building /usr/src/app /usr/src/app
RUN mkdir /usr/src/app/data-files
RUN apk add vim
WORKDIR /usr/src/app
EXPOSE 3000
CMD [ "node", "main.js" ]

