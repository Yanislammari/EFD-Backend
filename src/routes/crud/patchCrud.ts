import { Application, Request, Response } from 'express';
import { CrudAdmin } from '../../models/crud';
import { getAllErrors } from '../../utils';
import { ValidationError, UniqueConstraintError, Identifier } from 'sequelize';

async function patchAdmin(res: Response, req: Request, config: CrudAdmin, id: Identifier) {
    try {
        const authorizedAttributes = Object.keys(config.model.getAttributes()).filter(
            (attr) => !config.forbidden.includes(attr)
        );

        if (Object.keys(req.body).some((key) => !authorizedAttributes.includes(key))) {
            res.status(400).json({
                error: 'Bad Request',
                message: 'Provided attributes are not valid or allowed.'
            });
            return;
        }

        const item = await config.model.findByPk(id);

        if (!item) {
            res.status(404).json({ message: `Item not found in ${config.route}` });
            return;
        }

        await config.model.update(req.body, { where: { uuid: id } });
        res.status(200).json({ message: `Item updated in ${config.route}` });
    } catch (e: unknown) {
        const attributes = Object.keys(config.model.getAttributes());

        if (e instanceof ValidationError || e instanceof UniqueConstraintError) {
            getAllErrors(e, res, attributes);
            return;
        }

        console.error(e);
        res.status(500).json({ error: 'Error server', message: 'Error updating item.' });
    }
}

export const patchCrudAdmin = (app: Application, config: CrudAdmin) => {
    app.patch(`${config.route}/:uuid`, async (req: Request, res: Response) => {
        if (config.patch !== undefined && config.patch === false) {
            res.status(500).json({
                error: 'Error in the server',
                message: 'You aren t suppose to use this model like this'
            });
            return;
        }

        patchAdmin(res, req, config, req.params.uuid);
    });
};
