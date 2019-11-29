import TeamScore from '../../../services/db/TeamScore';

export const teamScoreModel = new TeamScore().getModelForClass(TeamScore);
