
# Business Checklist

This is a todo-list app.
A task can be added and categorized in a couple API calls.


## Features

- Category management
- Task management
- Marking the tasks as done or incomplete
- Marking the categories as done or incomplete


## Tech Stack

**Server:** Node.js (Apollo Server), GraphQL, Typescript, Prisma.io, Nexus, Docker
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NODE_ENV` The environment the app is running on i.e. production, development

`TZ` App Timezone

`PORT` The port which the server should listen to

`API_PATH` is The path to which the endpoint should be located. By default, it is /api

`DATABASE_URL` Database Url
## Installation

Install Business Checklist:

Install dependencies
```bash
  npm install
```
Run the server
```bash
  npm run start:prod
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/PooyaRaki/TaskManager.git
```

Go to the project directory

```bash
  cd TaskManager
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
  npm run start:dev
```


## Roadmap

- Adding unit tests

- Adding database support


## License

[GPL-3.0 license](https://github.com/PooyaRaki/TaskManager/blob/master/LICENSE)


## Authors

- [@PooyaRaki](https://github.com/PooyaRaki)

