import { Model, ModelStatic } from 'sequelize';
import * as models from './index';

/* eslint-disable */
export type CrudAdmin<T extends Model<any, any> = any> = {
    model:  ModelStatic<T>;
    route: string;
    forbidden: Array<string>;
    noReturn?: Array<string>;
    post?: boolean;
    patch?: boolean;
    delete?: boolean;
    get?: boolean;
    champNameToFillWithTokenId?: string;
    champNameToFindById?: string;
};

export const crudAdmin: CrudAdmin<models.Admin> = {
  model: models.Admin,
  route: '/admin',
  forbidden: ['uuid'],
  noReturn: ['password'],
};

export const crudDeliver: CrudAdmin<models.Deliver> = {
  model: models.Deliver,
  route: '/deliver',
  forbidden: ['uuid'],
  noReturn: ['password'],
}

export const crudAddress: CrudAdmin<models.Adress> = {
  model: models.Adress,
  route: '/address',
  forbidden: ['uuid'],
}

export const crudColis: CrudAdmin<models.Colis> = {
  model: models.Colis,
  route: '/colis',
  forbidden: ['uuid'],
}

export const crudLivraison: CrudAdmin<models.Livraison> = {
  model: models.Livraison,
  route: '/livraison',
  forbidden: ['uuid'],
}