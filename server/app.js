import bodyParser from 'body-parser';
import debug from 'debug';
import express from 'express';
import router from './api/routes/index';

const log = debug('dev');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to banka api' }));
app.use('/api/v1', router);

const port = process.env.PORT || 5000;

app.listen(port, log(`listening on port: ${port}`));

export default app;
