import express, { Application, Request, Response } from 'express'
import routes from './api/routes';
import dbInit from './db/init';
require('dotenv').config();

const app: Application = express();
const port = process.env.PORT;
const host = process.env.HOST;

dbInit();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

try {
    app.listen(port, () => {
        console.log(`Server running on http://${host}:${port}`);
    })
} catch (error) {
    console.log(`Error occurred: ${error}`);
}

export default app;