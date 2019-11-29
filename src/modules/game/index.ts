import { Router } from 'express';
import { CREATED, OK } from 'http-codes';
import { teamScoreModel } from '../../di/services/DBService';
import { incrementClicksValidation } from './validation';

const gameController = Router();

gameController.get('/leaderboard', async (req, res, next) => {
    try {
        const results = await teamScoreModel.getAllWithTotal();

        res.status(OK).send(results);
    } catch (e) {
        next(e);
    }
});

gameController.post('/incrementClicks', async (req, res, next) => {
    try {
        await incrementClicksValidation.validate(req.body);
        const { team, session, clicks } = req.body;

        const teamScoreExists = await teamScoreModel.exists({ name: team });

        if (!teamScoreExists) {
            await teamScoreModel.create({ name: team, members: [{ session, clicks }] });
            res.status(CREATED).send();
        } else {
            await teamScoreModel.findMemberAndUpdate(team, session, clicks);
            res.status(OK).send();
        }
    } catch (e) {
        next(e);
    }
});

export default gameController;
