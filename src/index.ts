//Importar express y tipos especificos
import express, { Application, Request, Response, NextFunction} from 'express'

//Importar rutas
import booksRouter from './routes/books-routes'

//Importar el middleware de manejo de errores
import { errorMiddleware } from './middlewares/error-middlewares'

//Importar cors
import cors from 'cors' 

import { authMiddleware } from './middlewares/auth-middlewares'

//Instanciar express
const app: Application = express ();

//Middleware global para analizar el cuerpo de las solicitudes
app.use(express.json())

//Configuración de rutas principales de la app
app.use('/api/books', booksRouter)

//Permitir cors para todas las rutas
app.use(cors())

app.use(authMiddleware)

//Middleware para manejar rutas que no existen
app.use((req: Request, res: Response) => {
    res.status(404).json({error: 'Endpoint no encontrado.'})
})

app.use(errorMiddleware)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})