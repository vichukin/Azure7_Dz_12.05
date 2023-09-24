import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {Author } from 'src/app/Models/Author'
import { AuthorService } from '../../Services/AuthorService';
import { BookService } from '../../Services/BookService';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent {
  authors: Array<Author> = []
  constructor(private http: HttpClient, private authorService: AuthorService, private bookService:BookService) { }
  ngOnInit() {
    this.authorService.getAuthors().subscribe(authors => {
      this.authors = authors;
      
      
    });
  }
  deleteAuthor(id: string) {
    let author: Author;
    this.authorService.getAuthor(id).subscribe(t => {
      author = t
      if (author != null) {
        if (author.books != null) {
          for (let item of author.books) {
            this.bookService.deleteBook(item.id);
          }
        }
        this.authorService.deleteAuthor(id);
        this.authors = this.authors.filter(author => author.id !== id)
      }
    }
    );
  }
}
