import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Author } from '../Models/Author';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthorService {
  constructor(private http: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>('https://localhost:7079/api/Author').pipe(
      map((data: Author[]) => {
        // Преобразование данных JSON в массив объектов Author
        console.log(data);
        return data.map(authorData => {
          return new Author(
            authorData.id,
            authorData.name,
            authorData.yearOfBirth,
            authorData.books
          );
        });
      })
    );
  }
  getAuthor(id: string):Observable<Author> {
    return this.http.get<Author>(`https://localhost:7079/api/Author/${id}`).pipe(
      map((data: Author) => {
        // Преобразование данных JSON в массив объектов Author
        return new Author(data.id, data.name, data.yearOfBirth, data.books);
      }
      )
    );
  }
  editAuthor(author: Author):void {
    this.http.put(`https://localhost:7079/api/Author`, author).subscribe();
  }
  createAuthor(author: Author): void {
    this.http.post(`https://localhost:7079/api/Author`, author).subscribe();
    
  }
  deleteAuthor(id: string): void {
    this.http.delete(`https://localhost:7079/api/Author/${id}`).subscribe();

  }
}
