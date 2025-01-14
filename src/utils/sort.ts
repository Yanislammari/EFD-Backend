import { Model } from 'sequelize';

/* eslint-disable */
export const classByOlder = (tickets: Model<any, any>[] | null) => {
    if (tickets.length === 0) return [];

    return tickets.sort((a, b) => {
        return a.getDataValue('created_at').getTime() - b.getDataValue('created_at').getTime();
    });
};

/* eslint-disable */
export const classByNewer = (tickets: Model<any, any>[] | null) => {
    if (tickets.length === 0) return [];

    return tickets.sort((a, b) => {
        return b.getDataValue('created_at').getTime() - a.getDataValue('created_at').getTime();
    });
};
