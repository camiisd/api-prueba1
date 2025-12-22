//Importar el modulo Router
import { Router } from 'express'

//Importar las funciones
import {
    getAllBooks, 
    getBookById, 
    createBook, 
    updateBook, 
    deleteBook
} from '../controllers/books-controllers'

//Importar el middleware que controla los datos de los libros
import { validateBook } from '../middlewares/validate-middlewares'

