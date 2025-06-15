## Norigin EPG Candidate Tester
This Repo is an EPG view built using the React-based Next framework, using the mock API provided by Norigin (https://github.com/NoriginMedia/mock-api/tree/cloudberry) and its designs.
Start by cloning the repository into your machine using
```
-> git clone https://github.com/Epsiloth/norigin-test.git
```
---
## Deploying the app
To run it you will need two terminals. The first one to run the mock API using the following command:
```
-> npm run start-api
```

And the second one, to build a production version of the app and deploy it. Use the following commands in order:
```
-> npm run build
```

```
-> npm run start
```

By default the app will deploy using http://localhost:3000.
