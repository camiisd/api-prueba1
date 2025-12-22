// Importamos los tipos especificos de Express
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization'];

    // Verifica si existe un token
    if (!token || token !== 'Bearer my-secret-token') {
        res.status(401).json({ error: 'No autorizado'});
        return // Finaliza la ejecucion
    }

    // Si la autenticacion pasa, continua con el siguiente middleware
    next();
};