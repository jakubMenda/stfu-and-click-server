import * as WebSocket from 'ws';
import { incrementClicksValidation } from '../../../../modules/game/validation';
import { teamScoreModel } from '../../../services/DBService';
import { broadcast } from '../utils/broadcast';

const messageHandler = async (data: WebSocket.Data, wss: WebSocket.Server) => {
    if (typeof data !== 'string') {
        throw new Error('Bad Request');
    }

    const parsedData = JSON.parse(data);
    await incrementClicksValidation.validate(parsedData);

    const { team, clicks, session } = parsedData;
    const teamScoreExists = await teamScoreModel.exists({ name: team });

    if (!teamScoreExists) {
        await teamScoreModel.create({ name: team, members: [{ session, clicks }] });
    } else {
        await teamScoreModel.findMemberAndUpdate(team, session, clicks);
    }

    const leaderboard = await teamScoreModel.getAllWithTotal();
    broadcast(wss, leaderboard);
};

export default messageHandler;
