import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../utils/db_handler';
import { Deliver } from './deliver';

export const attributesLivraison = {
    uuid: 'uuid',
    deliveryman_id : 'deliveryman_id',
    livraison_date: 'livraison_date',
    status : 'status',
    createdAt: 'created_at',
    updatedAt: 'upadated_at'
};

export class Livraison extends Model {
    public uuid!: string;
    public deliveryman_id!: string;
    public livraison_date!: Date;
    public status!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Livraison.init(
  {
    uuid:{
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    deliveryman_id:{
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Deliver,
        key: 'uuid'
      }
    },
    livraison_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Livraison date cannot be empty" },
        notNull: { msg: "Livraison date cannot be null" }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    }
  },
  {
    sequelize,
    modelName: 'livraison',
  }
);

Livraison.belongsTo(Deliver, {
  foreignKey: 'deliveryman_id',
  as: 'deliveryman',
});

