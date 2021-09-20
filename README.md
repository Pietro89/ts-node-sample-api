#example api
Typescript Node Express Api

## Pre-requisities
Runs on Node versions >= 10

Install dependencies using npm
```
npm install
```

## How to run
Make sure the port 3000 is free or pass another port in the environment variable "API_PORT"
Run the API using the command
```
npm run start
```

Run the TESTS using the command
```
npm run test NODE_ENV=test
```

## Documentation
Once the server is running locally visit localhost:<PORT>/docs to take a look at the api documentation and test it.

## Real world
This is far to be production ready in a real world, i decided to skip some trivial things including:
- environments: in areal world you would have the api served in at least 3 environments with config changing between environments
- api authentication: a JWT auth system should be implemented for this api
- a ci / cd pipeline should bee added to the project
- etc..

## Notes
**ts-node-dev** is the Typescript replacement for Nodemon. It allows to run the ts file directly. This is to avoid having to stop the server to run tsc && node ./index.js

## License
MIT
