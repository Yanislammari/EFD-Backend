import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db_handler';

export const attributesDeliver = {
    uuid: 'uuid',
    first_name : 'first_name',
    name : 'name',
    phone : 'phone',
    status : 'status',
    email : 'email',
    password: 'password',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
};

export class Deliver extends Model {
    public uuid!: string;
    public first_name!: string;
    public name!: string;
    public phone!: string;
    public status!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Deliver.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "First name can't be empty" },
            notNull: { msg: "First name can't be null" },
            len: {
                args: [0, 128], // Minimum and maximum length
                msg: "First name can't be longer than 128 characters"
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Name can't be empty" },
            notNull: { msg: "Name can't be null" },
            len: {
                args: [0, 128], // Minimum and maximum length
                msg: "Name can't be longer than 128 characters"
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Phone can't be empty" },
            notNull: { msg: "Phone can't be null" },
            len: {
                args: [0, 128], // Minimum and maximum length
                msg: "Phone can't be longer than 128 characters"
            }
        }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
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
    },
  },
  {
    sequelize,
    modelName: 'deliveryman',
  }
);