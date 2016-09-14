FROM node

RUN npm install json-mock -g

RUN mkdir /config

VOLUME ["/config"]

EXPOSE 3000

CMD ["json-mock", "/config/users.json"]
