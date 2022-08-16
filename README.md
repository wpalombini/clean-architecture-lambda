## Clean Architecture on AWS Lambda

This project is a demo of clean architecture on AWS Lambda.

Stack used:

- Typescript
- TSyringe
- Jest

You in order to run it you need to ensure you have serverless installed globally and then run:

### Commands:

- install dependencies:

```bash
$ npm install
```

- run it locally in dev mode:

```bash
$ npx serverless offline
```

- run it locally in staging mode:

```bash
$ npx serverless offline --stage staging
```

- deploy it to aws:

```bash
$ npx serverless deploy --stage prod
```

- To run the tests:

```
$ npm test
```
