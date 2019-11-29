import * as WebSocket from 'ws';

export const broadcast = <T>(wss: WebSocket.Server, data: T) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
};
