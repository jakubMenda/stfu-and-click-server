import * as mongoose from 'mongoose';
import server from './di/server';

const port = process.env.PORT || 8080;

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
    },
    () => {
        server.listen(port, () => console.log(`Express listening on ${port}`));
    },
);
