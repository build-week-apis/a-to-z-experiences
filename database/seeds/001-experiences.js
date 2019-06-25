exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("experiences")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("experiences").insert([
        {
          user_id: 1,
          title: "Arts & crafts",
          date: "9/2/19",
          location: "Brooklyn, NY",
          price: "$20",
          description: "Art lessons for all ages"
        },
        {
          user_id: 2,
          title: "Swimming",
          date: "7/28/19",
          location: "San Francisco, CA",
          price: "$30",
          description: "Swimming lessons for the family"
        },
        {
          user_id: 3,
          title: "Fishing",
          date: "11/12/19",
          location: "Princeton, NJ",
          price: "$15",
          description: "Family friendly fishing trip"
        }
      ]);
    });
};