'use strict';

const utils                             = require('./server/utils');

// The 'include' function is set globally for use it with the root directory.
utils.setGlobalInclude(__dirname);

const express                           = include('express'),
      http                              = include('http'),
      logic                             = include('server/logic');

const PORT                              = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname +'/client'));

logic.createSocket(server);

server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});