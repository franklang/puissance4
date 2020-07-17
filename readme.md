# PUISSANCE 4

## Setup with Docker and Docker Compose

From the root folder of the project:
```
// Run the service (and access the container shell):
docker-compose run --rm --service-ports dev_env
```

From the container shell:
```
// Only execute once, at project init, or whenever a new dependency is added to the package.json file:
yarn install

// Compile front-end assets and start server:
yarn start
```

To test the server, visit http://localhost:8080/ in your local browser.

Reference documentation for further information (link to english written tutorial provided): [Utiliser Docker pour créer un environnement de développement NodeJS](https://devfrontend.info/dockernodejs-utiliser-docker-pour-creer-un-environnement-de-developpement-nodejs/)

## Setup without Docker

Please refer to [ZURB Template's original readme file guidelines](https://github.com/foundation/foundation-zurb-template/blob/v6.6.0/readme.md)

## Reference projects:
https://github.com/jakedean/multiplayer_connect_four
