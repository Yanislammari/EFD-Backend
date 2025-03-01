import { Request, Response, NextFunction } from 'express';
import { tokenText } from './token';

export const isVerifyMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      try {
        const userId = req[tokenText]?.id;
        const id = req.params.id;

        if(userId != id) {
          return res.status(401).json({ error: "Is not your account" });
        }

        next();
      }
      catch(err) {
        return res.status(500).json({ error: "Internal server error" });
      }
    })();
  };
};
