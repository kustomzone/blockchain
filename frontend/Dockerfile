FROM node

ADD ./build /static
ADD ./server /server

WORKDIR /server

RUN npm install

EXPOSE 8080

CMD [ "node", "server.js" ]
