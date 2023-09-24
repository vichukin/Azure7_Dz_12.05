import { Author } from 'src/app/Models/Author'
class Book {
  constructor(public id: string, public title: string, public description: number, public authorId: string, public author: Author) { }
}
export {Book }
