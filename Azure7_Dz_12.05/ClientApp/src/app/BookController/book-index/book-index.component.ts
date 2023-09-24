import { Component } from '@angular/core';
import { BookService } from '../../Services/BookService';
import { Book } from '../../Models/Book';

@Component({
  selector: 'app-book-index',
  templateUrl: './book-index.component.html',
  styleUrls: ['./book-index.component.css']
})
export class BookIndexComponent {
  books!: Book[]
  constructor(private bookService: BookService) { }
  ngOnInit() {
    this.bookService.getBooks().subscribe(t => {
      this.books = t;
    })

  }
  deleteBook(id:string) {
    this.bookService.deleteBook(id);
    this.books = this.books.filter(book => book.id !== id)
  }
}
