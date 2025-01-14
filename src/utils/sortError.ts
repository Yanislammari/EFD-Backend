import { Response } from 'express';
import { UniqueConstraintError, ValidationError } from 'sequelize';

export function getAllErrors(e: ValidationError | UniqueConstraintError, res: Response, tables: string[]): void {
    const jsonResult = {};
    tables.map((table) => {
        const error = e.errors.find((err) => err.path === table);

        if (error) {
            jsonResult[table] = error.message;
        }
    });
    res.status(400).json(jsonResult);
}

export function findPath(e: ValidationError | UniqueConstraintError, tables: string[]): boolean {
    let findError = true;
    tables.map((table) => {
        const error = e.errors.find((err) => err.path === table);

        if (error) {
            findError = false;
        }
    });
    return findError;
}
