import * as http from 'http';
import { expressServer } from '../express';
import webSocket from '../webSocket';

const server = http.createServer(expressServer);
webSocket(server);

export default server;
