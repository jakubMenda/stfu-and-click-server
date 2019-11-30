import { arrayProp, ModelType, prop, staticMethod, Typegoose } from 'typegoose';
import { teamScoreModel } from '../../../di/services/DBService';

class TeamMember extends Typegoose {
    @prop({ required: true })
    session: string;

    @prop({ required: true })
    clicks: number;
}

class TeamScore extends Typegoose {
    @prop({ required: true, trim: true })
    name: string;

    @arrayProp({ required: true, items: TeamMember })
    members: TeamMember[];

    @staticMethod
    static async findMemberAndUpdate(this: ModelType<TeamScore>, team: string, session: string, clicks: number) {
        const teamScore = await teamScoreModel.findOne({ name: team });

        const member = teamScore.toObject().members.find((member) => member.session === session);

        if (!member) {
            const teamScoreObj = teamScore.toObject();
            await teamScore.updateOne({
                ...teamScoreObj,
                members: [...teamScoreObj.members, { session, clicks }],
            });
            await teamScore.save();

            return teamScore;
        }

        return teamScoreModel.findOneAndUpdate(
            { name: team, 'members.session': session },
            {
                $set: {
                    'members.$': { ...member, clicks: member.clicks + clicks },
                },
            },
        );
    }

    @staticMethod
    static async getAllWithTotal(this: ModelType<TeamScore>) {
        const teams = await teamScoreModel.find();

        return teams.map((team) => ({
            ...team.toObject(),
            total: team.members.reduce((total, member) => (member.clicks || 0) + total, 0),
        }));
    }
}

export default TeamScore;
