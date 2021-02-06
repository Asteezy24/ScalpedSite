const express = require('express')
const server = express()
server.use(express.static(__dirname));
server.use(express.static("public"));

const port = 8000;
server.listen(port, function() {
  console.log('server listening on port ' + port)
})