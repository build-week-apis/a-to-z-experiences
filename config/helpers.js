const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  addExperience,
  getExperiences,
  getExperienceById,
  deleteExperience,
  editExperience,
  getExperienceWithUserById,
  getUsers,
  getUserById,
  editUser,
  deleteUser
};

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

///// EXPERIENCE /////
async function addExperience(newExperience) {
  const [id] = await db("experiences").insert(newExperience);
  return getExperiences();
}

function getExperiences() {
  return db("experiences");
}
function getExperienceById(id) {
  return db("experiences")
    .where({ id })
    .first();
}

function deleteExperience(id) {
  return db("experiences")
    .where({ id })
    .del();
}

function editExperience(id, changes) {
  return db("experiences")
    .where({ id })
    .update(changes);
}

function getExperienceWithUserById(id) {
  return db("experiences")
    .where({ "experiences.user_id": id })
    .first()
    .join("users", "users.id", "experiences.user_id")
    .select("users.id", "users.username");
}

///// USERS /////
function getUsers() {
  return db("users");
}

function getUserById(id) {
  return db("users")
    .where({ id })
    .first()
    .select(
      "users.id",
      "users.username",
      "users.name",
      "users.location",
      "users.description"
    );
  // db("experiences")
  //   .where({ "experiences.user_id": id })
  //   .join("users", "users.id", "experiences.user_id")
}

function editUser(id, changes) {
  return db("users")
    .where({ id })
    .update(changes);
}

function deleteUser(id) {
  return db("users")
    .where({ id })
    .del();
}
