import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const attributesAdmin = {
    uuid: 'uuid',
    email : 'email',
    password: 'password',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
};

export class Admin extends Model {
    public uuid!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Admin.init(
    {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: {
              name: 'unique_email_constraint',
              msg: "Email already exists"
          },
          validate: {
              notEmpty: { msg: "Email can't be empty" },
              notNull: { msg: "Email can't be null" },
              len: {
                  args: [0, 128], // Minimum and maximum length
                  msg: "Email can't be longer than 128 characters"
              },
              isEmail: { msg: "Wrong format" }
        }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'admin',
    }
);
