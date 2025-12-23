//Importar el modulo Router
import { Router } from 'express'

//Importar las funciones
import {
    getAllBooks, 
    getBookById, 
    createBook, 
    updateBook, 
    deleteBook,
    getBookByAuthor
} from '../controllers/books-controllers'

//Importar el middleware que controla los datos de los libros
import { validateBook } from '../middlewares/validate-middlewares'

const router: Router = Router()

//Rutas

// 1. GET para obtener todos los libros
router.get('/', getAllBooks)

// 2. GET para obtener por ID
router.get('/', getBookById)

// 3. POST para crear libro
router.post('/', validateBook, createBook)

// 4. PATCH para actualizar libro
router.patch('/:id', updateBook)

// 5. DELETE para eliminar un libro
router.delete('/:id', deleteBook)

// 6. GET para obtener por autor
router.get('/:author=nombre', getBookByAuthor)

export default router