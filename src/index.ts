//Importar express y tipos especificos
import express, { Application, Request, Response, NextFunction} from 'express'
//Importar cors
import cors from 'cors' 
//Importar rutas
import booksRouter from './routes/books-routes'

//Importar el middleware de manejo de errores
import { errorMiddleware } from './middlewares/error-middlewares'
import { authMiddleware } from './middlewares/auth-middlewares'

//Instanciar express
const app: Application = express ();

//Middleware global para analizar el cuerpo de las solicitudes
app.use(express.json())

//Permitir cors para todas las rutas
app.use(cors())

app.use(authMiddleware)

//Configuración de rutas principales de la app
app.use('/api/books', booksRouter)

//Middleware para manejar rutas que no existen
app.use((req: Request, res: Response) => {
    res.status(404).json({error: 'Endpoint no encontrado.'})
})

app.use(errorMiddleware)

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})