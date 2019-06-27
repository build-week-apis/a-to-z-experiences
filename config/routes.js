// const axios = require("axios");
const Users = require("./helpers.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticate, generateToken } = require("../auth/authenticate");

module.exports = server => {
  server.get("/", testServer);
  server.get("/api/experiences", experiences);
  server.get("/api/users", users);
  server.get("/api/users/:id", userById);
  server.get("/api/experiences/:id", experienceById);
  server.get("/api/users/experiences/:id", userHostExperiences);
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.post("/api/experiences", postExperience);
  server.put("/api/experiences/:id", updateExperience);
  server.put("/api/users/:id", updateUser);
  server.delete("/api/users/:id", deleteUser);
  server.delete("/api/experiences/:id", deleteExperience);
  server.get("/api/users/:id/experiences", usersAttendingExperiences);
};

///// SANITY CHECK //////
function testServer(req, res) {
  res.send("Sanity Check!");
}

///// REGISTER /////
function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(newUser => {
      const token = generateToken(newUser);
      console.log("TOKEN:", token);
      res.status(201).json({
        message: `Welcome ${
          user.username
        }! You have been successfully registered!`,
        newUser,
        token
      });
    })
    .catch(err => {
      console.log("register", err);
      res
        .status(500)
        .json({ message: "Sorry, but something went wrong while registering" });
    });
}

///// LOGIN /////
function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // generate token
        const token = generateToken(user);

        res.status(200).json({
          user,
          message: `Welcome ${user.username}!`,
          token //return the token upon login
        });
      } else {
        res
          .status(401)
          .json({ message: "Wrong username or password. Try again." });
      }
    })
    .catch(error => {
      console.log("Login error", error);
      res
        .status(500)
        .json({ message: "Sorry, but something went wrong while logging in" });
    });
}
///// POST EXPERIENCE /////
function postExperience(req, res) {
  const { title, date, location } = req.body;
  if (!title || !date || !location) {
    res.status(400).json({
      message: "Sorry, all new experiences require a title, date, and location."
    });
  } else {
    Users.addExperience(req.body)
      .then(experience => {
        res.status(201).json(experience);
      })
      .catch(err => {
        res.status(500).json({
          message: "Sorry, but something went wrong while added the experience"
        });
      });
  }
}
///// GET EXPERIENCES /////
function experiences(req, res) {
  let experience = req.body;
  Users.getExperiences(experience)
    .then(experiences => {
      res.status(200).json({ experiences });
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Sorry, Theres been an error getting experiences" });
    });
}

///// GET USERS /////
function users(req, res) {
  let user = req.body;
  Users.getUsers(user)
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error getting users" });
    });
}

/////GET USER BY ID /////
function userById(req, res) {
  const id = req.params.id;
  Users.getUserById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Sorry, but something went wrong while getting that user profile"
      });
    });
}

/////GET EXPERIENCES BY ID /////
function experienceById(req, res) {
  const id = req.params.id;
  Users.getExperienceById(id)
    .then(experience => {
      res.status(200).json(experience);
    })
    .catch(err => {
      res.status(500).json({
        message: "Sorry, but something went wrong while getting that experience"
      });
    });
}

///// GET USER EXPERIENCES /////
function userHostExperiences(req, res) {
  const id = req.params.id;

  Users.getExperienceWithUserById(id)
    .then(users => {
      Users.getExperiences()
        .where({ user_id: id })
        .then(experiences => {
          users.experiences = experiences;
          return res.status(200).json(users);
        })
        .catch(err => {
          res.status(500).json(err);
        });
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Sorry, but something went wrong while getting that hosts experiences"
      });
    });
}

///// DELETE USER /////
function deleteUser(req, res) {
  const id = req.params.id;
  Users.deleteUser(id)
    .then(deleted => {
      res
        .status(200)
        .json({ message: `${deleted} successfully user was deleted.` });
    })
    .catch(err => {
      res.status(500).json(err, {
        message: "Sorry, but something went wrong while deleting that user"
      });
    });
}

///// DELETE EXPERIENCE /////
function deleteExperience(req, res) {
  const id = req.params.id;
  Users.deleteExperience(id)
    .then(deleted => {
      res.status(200).json({ message: `${deleted} experience was deleted.` });
    })
    .catch(err => {
      res
        .status(500)
        .json({
          message:
            "Sorry, but something went wrong while deleting that experience"
        });
    });
}

///// UPDATE EXPERIENCE /////
function updateExperience(req, res) {
  const id = req.params.id;
  const changes = req.body;
  const { title, date, description } = req.body;
  // if (!title || !date || !description) {
  //   res
  //     .status(400)
  //     .json({ message: "Experiences require a title, date, and location." });
  // } else {
  Users.editExperience(id, changes)
    .then(updatedExperience => {
      res
        .status(201)
        .json(
          { message: "Your experience has been successfully update" },
          updatedExperience
        );
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Sorry, but something went wrong while updating that experience"
      });
    });
  // }
}

/////UPDATE USER //////
function updateUser(req, res) {
  const id = req.params.id;
  const changes = req.body;
  // const { title, date, description } = req.body;
  // if (!username || !password || !description) {
  //   res
  //     .status(400)
  //     .json({ message: "Experiences require a title, date, and location." });
  // } else {
  Users.editUser(id, changes)
    .then(updatedUser => {
      res.status(201).json({
        message: `Your profile has been successfully updated`
      });
    })
    .catch(err => {
      res.status(500).json({
        message: `Sorry, but something went wrong while updating that profile`
      });
    });
  // }
}

///// GET USERS ATTENDING EXPERIENCES //////
function usersAttendingExperiences(req, res) {
  const id = req.params.id;
  Users.getUsersExperiences(id)
    .then(event => {
      console.log("event:", event);
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(500).json({
        message: `Error getting users attending experiences`
      });
    });
}
