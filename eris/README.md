Eris in docker
==============
Basic commands
--------------
Start image in daemon mode:
```
docker-compose up -d
```
To connect to running daemon container:
```
docker exec -it eris
```
Networking
----------
Link container to your api endpoint with:
```
docker run --link <eris-container>:eris ...
```
This container will be available at http://eris:PORT
Warning
-------
May only work on linux and Docker for Mac at the moment
