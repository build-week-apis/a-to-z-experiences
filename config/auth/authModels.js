const db = require("../../database/dbConfig.js");

module.exports = {
    add,
    find,
    findBy,
    findById
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
