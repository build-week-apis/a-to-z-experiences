module.exports = server => {
  server.get("/", testServer);
};

function testServer(req, res) {
  res.send("It's alive!");
}
