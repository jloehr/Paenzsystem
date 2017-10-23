Pänzsystem
==========

Pänzsystem is Registration Office and Bank Account System for Kinderstädte (Child Play/Kids Town). It provides a NodeJS Restful API as Back-End and an AngularJS PSA as Front-End.

## Requirements

* Docker

## Usage

paenzsystem [COMMAND]

* start       Start the app
* stop        Stops the app
* upgrade     Pulls latest images and renews containers.

## Development

For setup run "npm install" in each Server and WebFrontend directories. Besides downloading the node modules, that'll also generate ssl keys and a docker mongodb container.

### WebFrontend

AngularJS Single Page App. Use "mpn run build" to build it. That'll output it into the public Server folder.

### Server

Express NodeJS Server. Provides RestAPI and uses mongodb. Alos serves Single Page WebFrontend, located under "public".
Use "npm start" to start it. 

### Docker

Docker related scripts. App is deployed as docker containers. "paenzsystem" is end user script to control the docker container.
Use "devel.sh" to create local docker images and container. Is also used to setup development mongodb container.

## Building

App is autmatically build by docker hub.
For an local image run "devel.sh build".

## License

This is licensed under [GPL-3.0](https://github.com/jloehr/Paenzsystem/blob/master/LICENSE)
