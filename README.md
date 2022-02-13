# udacity-picture-server

## Functionality

This project runs an expess service to load and resize an image located in the
folder [images/original](./images/original).

## Build

Building the project use `npm run build` in the project root. The resulting js files will be located in the
folder `build`

## Server

To start the service either:

* build the project and run `node build/index.js`
* `npm run start`

Both options will start an express server which will listen on port 3000.

### Endpoit

The server constains a single GET endpoint.  
__Path__ `/images`  
With following query parameter:

| Parameter name | Description | Required | Example     |
|----------------|-----|----------|-------------|
| fileName       | The name of the requested image | true     | `fjord.jpg` |
| width          | The pixel witdh of the resized image | false | `50`        |
| height         | The pixel height of the resized image | false | `50`        |

### Example

*
Calling [http://localhost:3000/images?fileName=fjord.jpg&width=50&height=50](http://localhost:3000/images?fileName=fjord.jpg&width=50&height=50)
* `curl --request GET --url 'http://localhost:3000/images?fileName=fjord.jpg&width=50&height=50'`
* Using postman and importing the
  collection [Udacity-image-server-postman-collection.json](./Udacity-image-server-postman-collection.json)

## Scripts

Scripts can be run with `npm run <script>`

* `start` will start a dev-server on port 3000
* `test` will run all test
* `build` builds the project. Output directory is named `build`
* `lint` will run eslint for src and spec files
* `prettier` will run prettier for src and spec files

## Credit

The image located in [images/original](./images/original) have been provided by Udacity and have been user with there
consent.
