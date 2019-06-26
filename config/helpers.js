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
  getUsers,
  getUserById,
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
function addExperience() {
  return db("experiences");
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

///// USERS /////
function getUsers() {
  return db("users");
}

function getUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

function deleteUser(id) {
  return db("users")
    .where({ id })
    .del();
}
