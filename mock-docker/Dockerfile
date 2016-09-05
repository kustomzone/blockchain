FROM node

RUN npm install rest-server-mock -g

RUN mkdir /config

VOLUME ["/config"]

EXPOSE 8080

CMD ["rest-server-mock", "/config/config.json"]
