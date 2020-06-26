FROM node:12 as building
WORKDIR /usr/src/app
COPY ./dist .
COPY package.json .
RUN npm install --only=prod

FROM node:12-alpine
COPY --from=building /usr/src/app /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3000
CMD [ "node", "main.js" ]

