# AtoZ_backend

Backend for A to Z build week project

```
#temporary endpoint cheat sheet


**Auth endpoints**
*Register: /api/register
*Login: /api/login

**User endpoints**
*get all users: /api/users
*get users by id: /api/users/:id
*update user: /api/users/:id
*delete user: /api/users/:id
*get users registered experiences: /api/users/:id/experiences

**Experience endpoints**
*get experiences: /api/experiences
*get experience by id: /api/experiences/:id
*get experiences added by user(host): api/users/experiences/:id
*add new experience: /api/experiences
*update experience: /api/experiences/:id
*delete experience: /api/experiences/:id
```

# Deployed Backend

[https://atoz-backend.herokuapp.com]

# Technologies

###### Production

- [Express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js
- [Bcryptjs](https://www.npmjs.com/package/body-parser): Allows you to store passwords securely in your database
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Generate and verify json web tokens to maintain a stateless api
- [Knex](https://www.npmjs.com/package/knex): Knex.js is a "batteries included" SQL query builder for Postgres, MSSQL, MySQL, MariaDB, SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use
- [Sqlite3](https://www.npmjs.com/package/sqlite3): Asynchronous, non-blocking SQLite3 bindings for Node.js.
- [Morgan](https://www.npmjs.com/package/morgan): `HTTP request logger middleware for Node.js`
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

## **REGISTER**

### **Registers a user**

_Method Url:_ `/api/register`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name          | type   | required | description    |
| ------------- | ------ | -------- | -------------- |
| `username`    | String | Yes      | Must be unique |
| `password`    | String | Yes      |                |
| `name`        | String | No       |                |
| `location`    | String | No       |                |
| `description` | String | No       |                |

_example:_

```

{
  "username": "username"
  "password": "password123",
  "name": "First Last",
  "location": "San Francisco, CA",
  "description": "Description of user to be shared with other users",
}

```

#### Response

##### 201 (Created)

> If you successfully register a user the endpoint will return an HTTP response with a status code `201`,message, and a token as below.

_example:_

```
{
  "message": "Welcome user! You have been successfully registered!"
},
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI3IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MzM1NjUxLCJleHAiOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xFXoX"
}

```

##### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while registering"
}

```

---

## **LOGIN**

### **Logs a user in**

_Method Url:_ `/api/login`

_HTTP method:_ **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description                                                        |
| ---------- | ------ | -------- | ------------------------------------------------------------------ |
| `username` | String | Yes      | Must match a username in the database                              |
| `password` | String | Yes      | Must match a password in the database corresponding to email above |

_example:_

```
{
  "message": "Welcome, user!"
},
{
  "username": "username"
  "password": "password123",
}

```

#### Response

##### 200 (OK)

> If you successfully login, the endpoint will return an HTTP response with a status code `200`, message, and a token as below.

_example:_

```

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MDwiaWF0IjoxNTQ0MzM1NjUxLCJleHAuOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXnE",
}

```

##### 401 (Unauthorized)

> If you fail to login, the endpoint will return an HTTP response with a status code `401` which indicates the username and/or password entered is not valid.

_example:_

```

{
  message: "Wrong username or password. Try again."
}

```

##### 500 (Bad Request)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while logging in"
}

```

# USERS ROUTES

## **GET USER**

### **Get all users**

_Method Url:_ `/api/users`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> The endpoint will return an HTTP response with a status code 200 and a body as below.

_example:_

```

{
  "id": 1,
  "username": "username"
  "password": "$2a$10$PNjMLdKfpOmusTou0JC6qOvhi74b21TbMkvRq3Bb5ionOr703leD2",
  "name": "First Last",
  "location": "San Francisco, CA",
  "description": "Description of user to be shared with other users",

}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Error getting users"
}

```

## **GET USER BY ID**

### **Get user profile by user id**

_Method Url:_ `/api/users/:id`

_HTTP method:_ **[GET]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Response

##### 200 (OK)

> If the user profile is found in the database, the endpoint will return an HTTP response with a status code 200 and a body as below.

_example:_

```

{
  "id": 1,
  "username": "username"
  "password": "$2a$10$PNjMLdKfpOmusTou0JC6qOvhi74b21TbMkvRq3Bb5ionOr703leD2",
  "name": "First Last",
  "location": "San Francisco, CA",
  "description": "Description of user to be shared with other users",
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while getting that user profile"
}

```

## **UPDATE USER**

### **Update a user by user id**

_Method Url:_ `/api/users/:id`

_HTTP method:_ **[PUT]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description             |
| ---- | ------- | -------- | ----------------------- |
| id   | Integer | Yes      | ID of a specific seeker |

#### Body

| name          | type   | required | description |
| ------------- | ------ | -------- | ----------- |
| `username`    | String | No       |             |
| `name`        | String | No       |             |
| `location`    | String | No       |             |
| `description` | String | No       |             |

_example:_

```

{
  "username": "username",
  "name": "First Last",
  "location": "Brooklyn, NY",
  "description": "description of user"
}

```

#### Response

##### 200 (OK)

> If a seeker with the specified ID in the URL parameters is updated successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

{
  "message": `Your profile has been successfully updated`
}

```

#### 500 (Internal Server Error)

> If there is a server or database error, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while updating that profile"
}

```

## **DELETE USER**

### **Delete a USER by user id**

_Method Url:_ `/api/users/:id`

_HTTP method:_ **[DELETE]**

#### Headers

| name            | type   | required | description              |
| --------------- | ------ | -------- | ------------------------ |
| `Content-Type`  | String | Yes      | Must be application/json |
| `Authorization` | String | Yes      | JSON Web Token           |

#### Parameters

| name | type    | required | description             |
| ---- | ------- | -------- | ----------------------- |
| id   | Integer | Yes      | ID of a specific seeker |

#### Response

##### 200 (OK)

> If a seeker with the specified ID in the URL parameters is deleted successfully in the database, the endpoint will return an HTTP response with a status code `200` and a body as below.

_example:_

```

{
  "message": "1 user was successfully deleted"
}

```

#### 500 (Bad Request)

> If you send in invalid fields, the endpoint will return an HTTP response with a status code `500` and a body as below.

_example:_

```

{
  "message": "Sorry, but something went wrong while deleting that user"
}

```
