exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", user => {
    user.increments();
    user
      .string("username", 100)
      .notNullable()
      .unique();
    user.string("password", 100).notNullable();
    user.string("location", 200);
    user.string("description", 200);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("user");
};
