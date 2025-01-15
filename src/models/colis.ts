import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { Adress } from './adress';
import { Livraison } from './livraison';

export const attributesColis = {
    uuid: 'uuid',
    destination_name : 'destination_name',
    adress_id: 'adress_id',
    livraison_id: 'livraison_id',
    status : 'status',
    lgt : 'lgt',
    lat : 'lat',
    createdAt: 'created_at',
    updatedAt: 'upadated_at'
};

export class Colis extends Model {
    public uuid!: string;
    public destination_name!: string;
    public adress_id!: string;
    public livraison_id!: string;
    public status!: string;
    public lgt!: string;
    public lat!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Colis.init(
  {
    uuid:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    destination_name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Destination name cannot be empty" },
        notNull: { msg: "Destination name cannot be null" },
        len: {
          args: [1, 128],
          msg: "Destination name cannot be longer than 128 characters"
        }
      }
    },
    adress_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
          model: Adress,
          key: 'uuid'
      }
    },
    livraison_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
          model: Livraison,
          key: 'uuid'
      }
    },
    status :{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    lgt: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'colis',
  }
);


Colis.belongsTo(Adress, {
  foreignKey: 'adress_id',
});

Colis.belongsTo(Livraison,{
  foreignKey: 'livraison_id',
});
