Eris in docker
==============
Basic commands
--------------
To start image:
```
docker-compose up
```
To start image in daemon mode:
```
docker-compose -d up
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
