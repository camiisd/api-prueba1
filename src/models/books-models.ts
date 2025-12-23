//Importación de sistema de archivos y rutas
import fs from 'fs'
import path from 'path'

//Definir ruta del database
const filePath = path.join(__dirname, '../database/books.json')

//Interfaz que representa la estructura de un libro
interface Book {
    id: string,
    title: string,
    author: string, 
    year: number
};

//Encapsulamos todas las funciones en una sola clase
export class BooksModel {
    // 1. Leer todos los libros desde el archivo
    static getAllBooks(): Book[] {
        // Obtener TODOS los datos desde nuestra base de datos
        const data = JSON.parse(fs.readFileSync (filePath, 'utf-8'))
        return data.books
    }

    // 2. Libro según ID
    static getBookById (id: string) : Book | undefined {
        const data = this.getAllBooks(); //Obtiene todas los libros
        return data.find((book) => book.id === id) //Devuelve el libro por ID
    }

    // 3. Crear un libro
    static addBook (newBook: Book) : Book {
        //JSON.parse: pasar los datos JSON a ts/js
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Creamos un nuevo ID basado en la longitud del array
        const newId = (data.Books.length + 1).toString();

        //Creamos libro
        const book = { ...newBook, id: newId}
        data.books.push(book) //Se agrega el nuevo libro
        data.info.total += 1

        //JSON.stringify: guardar los datos al JSON
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return book //Devuelve el libro creado
    }

    // 4. Actualizar libro
    static updateBook (id: string, updatedData: Partial <Book>) : Book | null {
        // Leer JSON y buscar ID
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const index = data.books.findIndex((book: Book) => book.id === id);

        //Si no lo encuentra por ID
        if (index === -1) return null

        //Si el ID existe, se actualiza la frase cambiando los datos existentes
        data.books[index] = { ...data.books[index], updatedData}
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return data.quotes[index]
    }

    // 5. Eliminar libro
    static deleteBook (id: string): boolean {
        // Leer JSON y buscar ID
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const index = data.books.findIndex((book: Book) => book.id === id);

        //Si no lo encuentra, devuelve false
        if (index === -1) return false;

        //Eliminar libro y reducir contador
        data.books.splice(index, 1)
        data.info.total -= 1

        //Guardar cambios
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
        
    }

    // 6. Buscar libro por nombre de autor
    static getBookByAuthor (author: string) : Book | undefined {
        const data = this.getAllBooks(); //Obtiene todas los libros
        return data.find((book) => book.author === author) //Devuelve el libro por ID
    }
}