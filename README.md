# AtoZ_backend

Backend for A to Z build week project

# Deployed Backend

[https://atoz-backend.herokuapp.com]

# Technologies

###### Production

- [Express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js
- [Bcryptjs](https://www.npmjs.com/package/body-parser): Allows you to store passwords securely in your database
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Generate and verify json web tokens to maintain a stateless api
- [Knex](https://www.npmjs.com/package/knex): Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use
- [Sqlite3](https://www.npmjs.com/package/sqlite3): Asynchronous, non-blocking SQLite3 bindings for Node.js.
- [Cors](https://www.npmjs.com/package/cors): CORS is a Node.js package for providing a Connect/Express middleware that can be used to enable CORS
- [Helmet](https://www.npmjs.com/package/helmet): Helmet helps you secure your Express apps by setting various HTTP headers
- [Dotenv](https://www.npmjs.com/package/dotenv): Dotenv is a zero-dependency module that loads environment variables from a .env file

###### Developer

- [Nodemon](https://www.npmjs.com/package/nodemon): nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected

# Setup

(# <--- signifies comment)
In your terminal run:

```
# Install dependencies
npm install

# Starts express server using nodemon
npm run server
```

# Table of Contents

- Auth Routes
  - Login User
  - Register User

# AUTH ROUTES

## REGISTER

**Registers a user**
Method Url: /api/register

HTTP method: [POST]

**Headers**
| **name** | **type** | **required** | **description** |
| ------------ | -------- | ------------ | ------------------------ |
| Content-Type | String | Yes | Must be application/json |

**Body**
| **name** | **type** | **required** | **description** |
| ------------ | -------- | ------------ | ------------------------ |
| Content-Type | String | Yes | Must be application/json |
