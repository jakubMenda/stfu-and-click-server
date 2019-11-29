import { Server } from 'http';
import { BAD_REQUEST } from 'http-codes';
import * as WebSocket from 'ws';
import { teamScoreModel } from '../services/DBService';
import message from './handlers/message';

const injectWebSocket = (server: Server) => {
    const wss = new WebSocket.Server({ server, path: '/webSocket/game' });

    wss.on('connection', async (ws) => {
        try {
            ws.on('message', (data) => message(data, wss));

            const leaderboard = await teamScoreModel.getAllWithTotal();
            ws.send(JSON.stringify(leaderboard));
        } catch (e) {
            ws.close(BAD_REQUEST);
        }
    });
};

export default injectWebSocket;
