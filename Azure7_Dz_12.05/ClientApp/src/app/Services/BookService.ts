import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Author } from '../Models/Author';

import { Injectable } from '@angular/core';
import { Book } from '../Models/Book';
@Injectable()
export class BookService {
  constructor(private http: HttpClient) { }
  getBooks():Observable<Book[]> {
    return this.http.get<Book[]>(`https://localhost:7079/api/Book`).pipe(
      map(
        (t: Book[]) => {
          return t.map(data => {
            return new Book(data.id, data.title, data.description, data.authorId, data.author);
          })})
    );
  }
  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`https://localhost:7079/api/Book/${id}`).pipe(
      map((t: Book) => {
        return new Book(t.id, t.title, t.description, t.authorId, t.author);
      })
    )
  }
  createBook(book: Book) {
    this.http.post(`https://localhost:7079/api/Book`, book).subscribe();
  }
  editBook(book: Book) {
    this.http.put(`https://localhost:7079/api/Book`, book).subscribe();
  }
  deleteBook(id: string) {
    this.http.delete(`https://localhost:7079/api/Book/${id}`).subscribe();
  }

}
