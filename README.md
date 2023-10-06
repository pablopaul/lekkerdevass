# Lekker-Code "Node.js Developer Assessment" by Paul

Stack:
* express.js & express-generator
* Sequelize
* Sqlite in memory
* Jest
* Supertest
* Docker

## Run API in Docker

* `docker-compose up -d`
* Check `curl -i localhost:3000`

## Run Tests in Docker

* `docker-compose run api npm run test`

## Not implemented Features (because of time)

* Rank for user and teams
* Allow users to join existing teams
* Verify actual team owner

## Improvements / Open ToDos

* Seed integration test data
* Add more expectations to tests
* Make tests independent from specific order (cookie handling etc)

## API Docs

### Auth

POST /auth/signup
username:string
password:string
teamId:integer optional
score:integer optional

POST /auth/login
username:string
password:string

GET /userList

### Team

POST /team
name:string
maxMembers:integer

GET /teamList

PATCH /team (Updates the team which is owned be the current user)
name:string optional
maxMembers:integer optional

DELETE /team (Deletes the team which is owned by the current user)

#### User
GET /user/:id
