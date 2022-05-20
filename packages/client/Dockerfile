# THIS IS A DEVELOPMENT DOCKERFILE NOT FOR PRODUCTION !!!
FROM node:16-alpine

RUN apk update

EXPOSE 5000

WORKDIR /app/

COPY package.json package-lock.json

COPY ./ /app/

CMD ["npm", "start"]