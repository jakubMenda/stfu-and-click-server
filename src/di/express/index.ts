import * as bodyParser from 'body-parser';
import * as express from 'express';
import modules from '../../modules';
import errorHandling from '../../utils/errorHandling';

export const expressServer = express()
    .use(bodyParser.json())
    .use('/', modules)
    .use(errorHandling);
