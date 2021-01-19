import { Sequelize } from 'sequelize';

let sequelize: Sequelize;

export const initializeDb = async (): Promise<Sequelize> => {
    if (sequelize) {
        return sequelize;
    }

    console.log('Initializing database...');

    sequelize = new Sequelize({
        database: process.env.DB_DATABASE,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        dialect: 'mysql',
    });

    // const models = [];

    // models.forEach((model) => model.initModel(sequelize));
    // models.forEach((model) => model.initRelations());

    // TODO: Don't do this in prod.
    // await sequelize.sync({ alter: true });

    return sequelize;
};
