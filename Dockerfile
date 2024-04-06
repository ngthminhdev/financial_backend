#Base image
# FROM node:18.18.0
FROM node:18.18-alpine

RUN ln -fns /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && echo Asis/Ho_Chi_Minh > /etc/timezone

COPY ["package.json", "/SERVICE/package.json"]
COPY ["package-lock.json", "/SERVICE/package-lock.json"]
COPY ["yarn.lock", "/SERVICE/yarn.lock"]
COPY ["env", "/SERVICE/.env"]
COPY ["start.sh", "/start.sh"]

RUN chmod -R 777 /SERVICE
RUN chmod -R 777 /start.sh

RUN cd /SERVICE && yarn install

USER node

WORKDIR /SERVICE

COPY [".", "."]

EXPOSE 5000

RUN yarn build

ENTRYPOINT ["/start.sh"]
