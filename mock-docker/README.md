First build the dockerimage

docker build -t mockserver .

To run a container
The mounted config folder must contain a config.json file

docker run -p 8080:8080 --name mock -v ./config:/config mockserver
