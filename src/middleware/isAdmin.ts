import { Request, Response, NextFunction } from 'express';
import { tokenText } from './token';
import { getAdminById } from '../routes/admin/get_admin_by_id';

export const isAdminMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      try {
        const userId = req[tokenText]?.id;
        if(!userId) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const admin = await getAdminById(userId);
        if(!admin) {
          return res.status(403).json({ error: "You must be admin" });
        }

        next();
      }
      catch(err) {
        console.error("Middleware error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
    })();
  };
};
