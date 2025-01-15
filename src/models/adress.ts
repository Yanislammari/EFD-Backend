import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const attributesAddress = {
    uuid: 'uuid',
    country: 'country',
    city: 'city',
    street: 'street',
    postal_code: 'postal_code',
    createdAt: 'created_at',
    updatedAt: 'upadated_at'
};

export class Adress extends Model {
    public uuid!: string;
    public country!: string;
    public city!: string;
    public street!: string;
    public postal_code!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Adress.init(
    {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Country cannot be empty" },
                notNull: { msg: "Country cannot be null" },
                len: {
                    args: [1, 128],
                    msg: "Country cannot be longer than 128 characters"
                }
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "City cannot be empty" },
                notNull: { msg: "City cannot be null" },
                len: {
                    args: [1, 128],
                    msg: "City cannot be longer than 128 characters"
                }
            }
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Street cannot be empty" },
                notNull: { msg: "Street cannot be null" },
                len: {
                    args: [1, 256],
                    msg: "Street cannot be longer than 256 characters"
                }
            }
        },
        postal_code: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 56],
                    msg: "Postal code cannot be longer than 56 characters"
                },
                notEmpty: { msg: "Postal code cannot be empty" },
                notNull: { msg: "Postal code cannot be null" }
            }
        },
    },
    {
        sequelize,
        modelName: 'adress'
    }
);
