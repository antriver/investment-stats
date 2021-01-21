import { initializeDb } from '../src/backend/database';
import { createSnapshot } from '../src/backend/functions/snapshots/snapshots';

require('dotenv').config();

const run = async () => {
    const sequelize = await initializeDb();

    await createSnapshot(sequelize);

    await sequelize.close();
};

run();
