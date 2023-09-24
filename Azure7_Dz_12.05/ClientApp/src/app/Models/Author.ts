import { Book } from 'src/app/Models/Book'
class Author{
  constructor(public id: string, public name:string,public yearOfBirth:number, public books?: Array<Book>) { }
}
export { Author }
