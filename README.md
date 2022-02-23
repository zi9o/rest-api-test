## Retrieve repository

```sh
git clone git@github.com:zi9o/rest-api-test.git && cd rest-api-test
```

## Getting started

Install packages

```
yarn && cd front && mpn i
```

Start Api

```bash
npm run start-api
```

Start Api which response with delay (10s)

```bash
npm run delay-api
```

Start Frontend

```bash
npm run start:front
```

Build Frontend for production

```bash
npm run build:front
```

Start Server

```bash
# Dev
npm run watch
npm run dev

# Prod
npm run start
```

Update Api docs

```bash
# Dev
npm run swagger:gen
```

Run Unit/integration tests

```bash
# Dev
npm run test
```

## Api Routes

To load the last 20 stock value samples :

```console
$> curl http://localhost:3001/stocks?_limit=20
```

To load all available stock value samples :

```console
$> curl http://localhost:3001/stocks
```

More exemple : [here](https://github.com/typicode/json-server#routes)

Queries return a JSON array of stock samples :

```javascript
[
  {
    timestamp: "2018-11-08T14:47:41.157Z",
    index: 0,
    stocks: "17.482"
  },
  {
    timestamp: "2018-11-07T14:47:41.158Z",
    index: 1,
    stocks: "18.335"
  }
];
```
