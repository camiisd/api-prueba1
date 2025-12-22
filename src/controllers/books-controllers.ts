// Importar los tipos para definir las funciones de los controladores
import { Request, Response} from 'express'

//Importar el modelo de datos que contiene la logica
import { BooksModel } from '../models/books-models'

// 1. Controlador para obtener todos los libros
export const getAllBooks = (req: Request, res: Response): void => {
    //Llamar al método del modelo
    const books = BooksModel.getAllBooks()
    res.json(books) //Enviar los libros como respuesta en formato JSON
} 

// 2. Controlador para obtener un libro por ID
export const getBookById = (req: Request, res: Response): void => {
    const { id } = req.params // Extrae el parametro ID del endpoint
    //Llamar al método del modelo
    const book = BooksModel.getBookById(id)

    //Si no lo encuentra, devuelve error
    if(!book) {
        res.status(404).json({ error: 'Frase no encontrada.' });
        return
    }

    //Si lo encuentra, de vuelve la frase
    res.json(book)

    
}

// 3. Controlador para actualizar un libro
export const updateBook = (req: Request, res: Response): void => {
    //Extraer el parametro del endpoint
    const { id } = req.params
    //Llamar al método del modelo
    const updateBook = BooksModel.updateBook(id, req.body)

    //Si no lo encuentra, devuelve error
    if (!updateBook) {
        res.status(404).json({error: 'Libro no encontrado.'})
        return
    }

    //Devolver libro
    res.json(updateBook)
}

// 4. Controlador para eliminar
export const deleteBook = (req: Request, res: Response): void => {
    const { id } = req.params // Extraer el id del endpoint
    //Llamar al método del modelo
    const isDeleted = BooksModel.deleteBook(id)

    //Verificar
    if (!isDeleted) {
        res.status(404).json ({error: 'Libro no encontrado.'})
        return
    }

    //Si es eliminado, mandamos respuesta
    res.status(204).send()
}