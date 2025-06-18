FROM node:22

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . .

WORKDIR /home/app/edu-plan-pro

EXPOSE 3000

RUN npm i

CMD [ "npm","start" ]