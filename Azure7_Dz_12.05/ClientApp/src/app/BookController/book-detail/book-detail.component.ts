import { Component } from '@angular/core';
import { BookService } from '../../Services/BookService';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../Models/Book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent {
  id!: string;
  book!: Book;
  constructor(private bookService: BookService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(t => {
      this.id = t["id"];
      this.bookService.getBook(this.id).subscribe(t => {
        this.book = t;
      });
    });
  }
}
