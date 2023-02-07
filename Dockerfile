FROM node as builder

WORKDIR /app
EXPOSE 3000

COPY . /app

RUN yarn

CMD ["yarn", "dev"]
