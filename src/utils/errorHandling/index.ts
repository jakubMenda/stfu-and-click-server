import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from 'http-codes';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    try {
        if (err.statusCode) {
            res.status(err.statusCode).json({ message: err.message });
        } else if (!err && (res.statusCode === OK || res.statusCode === NOT_FOUND)) {
            res.status(NOT_FOUND).json({ message: 'Not found' });
        } else if (err.name === 'ValidationError') {
            res.status(BAD_REQUEST).json({ message: err.message });
        } else {
            throw new Error();
        }
    } catch (e) {
        res.status(INTERNAL_SERVER_ERROR).json({
            error: 'Internal server error',
        });
    }
};

export default errorHandler;
