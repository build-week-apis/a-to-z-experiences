module.exports = server => {
  server.get("/", testServer);
};

// sanity check
function testServer(req, res) {
  res.send("Hey girl!!");
}
