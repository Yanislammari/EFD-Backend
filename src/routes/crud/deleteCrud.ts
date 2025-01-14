import { Application, Request, Response } from 'express';
import { CrudAdmin } from '../../models/crud';
import { Identifier } from 'sequelize';

async function deleteFuncAdmin(res: Response, req: Request, config: CrudAdmin, id: Identifier) {
    try {
        const item = await config.model.findByPk(id);

        if (!item) {
            res.status(404).json({ message: `Item not found in ${config.route}` });
            return;
        }

        await config.model.destroy({ where: { uuid: id } });
        res.status(200).json({ message: `Item deleted from ${config.route}` });
    } catch (e: unknown) {
        console.error(e);
        res.status(500).json({ error: 'Error in the server', message: 'Error deleting item.' });
    }
}

export const deleteCrudAdmin = (app: Application, config: CrudAdmin) => {
    app.delete(`${config.route}/:uuid`, async (req: Request, res: Response) => {
        if (config.delete !== undefined && config.delete === false) {
            res.status(500).json({
                error: 'Error in the server',
                message: 'You aren t suppose to use this model like this'
            });
            return;
        }

        deleteFuncAdmin(res, req, config, req.params.uuid);
    });
};
