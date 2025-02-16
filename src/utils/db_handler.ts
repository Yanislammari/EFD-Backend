import { Sequelize } from 'sequelize';
import { hostDb, passwordDb, userDb } from './data';

export const sequelize = new Sequelize(hostDb, userDb, passwordDb, {
    host: '127.0.0.1',
    port: 8889,
    dialect: 'mysql',
    define: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    timezone: '-00:00',
    dialectOptions: {
        timezone: 'Z',
        dateStrings: true
    },
    logging: false
});

export const startOfDatabase = async () => {
    sequelize
        .sync({})
        .then(() => {
            console.log('Database and tables have been synchronized');
        })
        .catch((err) => {
            console.error('An error occurred while synchronizing the database:', err);
        });
};
