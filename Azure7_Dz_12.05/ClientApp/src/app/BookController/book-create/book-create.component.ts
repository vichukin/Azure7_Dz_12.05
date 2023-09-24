import { Component } from '@angular/core';
import { BookService } from '../../Services/BookService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author } from '../../Models/Author';
import { Book } from '../../Models/Book';
import { AuthorService } from '../../Services/AuthorService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent {
  authors!: Author[]
  book!: Book;
  isFormSubmit: boolean = false;
  constructor(private bookService: BookService, private builder: FormBuilder,private authorService: AuthorService, private router: Router) { }
  myform: FormGroup = this.builder.group({
    id: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
    authorId: ['0', Validators.required]
  })
  ngOnInit() {
    this.authorService.getAuthors().subscribe(t => {
      this.authors = t;
    });

  }
  onSubmit() {
    this.isFormSubmit = true;
    if (this.myform.get("authorId")?.value != "0"&&this.myform.valid) {
      this.book = { ...this.book, ...this.myform.value }
      this.bookService.createBook(this.book);
      this.router.navigateByUrl("/books");
    }
  }
}
