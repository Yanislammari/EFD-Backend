import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { keyToken } from '../utils/data';

export const tokenText = 'token';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers['authorization'] as string)?.split(' ')[1];

    if (!token) {
        return next();
        //return res.status(401).json({ message: 'Access Denied: No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, keyToken);

        req[tokenText] = decoded;

        return res.status(401).json({ message: 'Access Denied: Invalid user.' }); //fail case
    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

export const createVerifyTokenMiddleware = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        verifyToken(req, res, next);
    };
};
