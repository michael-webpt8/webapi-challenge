/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just API…
I need this code, just don't know where, perhaps should make some middleware, don't worry, just API

Go code!
*/
const express = require('express');
const projectsRouter = require('./routers/projectsRouters');

const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

const server = express();
server.use(express.json());

server.use('/projects', projectsRouter);

server.use((req, res) => {
  res.status(404).json({ message: 'Sorry, Route was not found' });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'An error occured, Please try later.' });
});

server.listen(port, host, () => {
  console.log(`\n*** Server is listning on http://${host}:${port} ***\n`);
});
