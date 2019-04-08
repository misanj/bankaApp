import debug from 'debug';
import express from 'express';

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, debug('dev')(`listening on port: ${port}`));
