import bodyParser from 'body-parser';
import debug from 'debug';
import express from 'express';
import morgan from 'morgan';
import router from './api/routes/index';

const log = debug('dev');
const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to banka api' }));
app.use('/api/v1', router);

// Error handling
app.get('*', (req, res) => {
  res.status(404).json({
    msg: 'Sorry!!, the page you are looking for cannot be found',
  });
});

app.listen(port, log(`listening on port: ${port}`));

export default app;
