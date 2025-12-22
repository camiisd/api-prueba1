// Importamos los tipos especificos de Express
import { Request, Response, NextFunction } from "express";

// Validamos como ingresan los datos en una frase
export const validateQuote = (req: Request, res: Response, next: NextFunction): void => {
    // Extraemos text y author del cuerpo de la solicitud
    const { title, author, year } = req.body;

    // comprobamos si existen
    if (!title || typeof title !== 'string') {
        res.status(400).json({ error: 'El campo "title" es requerido.' });
        return
    }

    if (!author || typeof author !== 'string') {
        res.status(400).json({ error: 'El campo "author" es requerido.' });
        return
    }

     if (!year || typeof year !== 'number') {
        res.status(400).json({ error: 'El campo "year" es requerido.' });
        return
    }

    // Si todo esta bien, pasa al siguinte middleware
    next();
};