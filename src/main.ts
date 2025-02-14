import express from 'express';
import bodyParser from 'body-parser';
import{ Request, Response } from 'express';
import { startOfDatabase } from './utils/db_handler';
import { createVerifyTokenMiddleware } from './middleware';
import * as modelsCruds from './models/crud';
import * as routeCruds from './routes/crud';
import * as routes from './routes';

startOfDatabase(); // start db

const app = express();
app.use(bodyParser.json()); 
//it must be put in authorization header
//you can access the id of the user in req[tokenText].id


Object.keys(routes).forEach((key) => {
    routes[key](app);
});

Object.keys(modelsCruds).forEach((key) => {
    Object.keys(routeCruds).forEach((routeKey) => {
        routeCruds[routeKey](app, modelsCruds[key]);
    });
});

app.get('/', (_req : Request, res : Response) => {
    res.json({ message: 'The API is working' });
});

app.use((_req : Request, res : Response) => {
    res.status(404).json({ message1: 'This route does not exist' });
});


app.listen(3000, '127.0.0.1', () => {
    console.log(`Notre application Node est démarrée sur : https://helpother.fr ou http://localhost:3000`);
});