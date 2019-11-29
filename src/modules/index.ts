import { Router } from 'express';
import game from './game';

const modules = Router().use('/game', game);

export default modules;
