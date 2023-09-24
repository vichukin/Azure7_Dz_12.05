import { Component } from '@angular/core';
import { BookService } from '../../Services/BookService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author } from '../../Models/Author';
import { Book } from '../../Models/Book';
import { AuthorService } from '../../Services/AuthorService';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent {
  authors!: Author[]
  book!: Book;
  isFormSubmit: boolean = false;
  constructor(private bookService: BookService, private builder: FormBuilder, private authorService: AuthorService, private router: Router, private route: ActivatedRoute) { }
  myform: FormGroup = this.builder.group({
    id: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
    authorId: ['', Validators.required]
  })
  id!: string;
  ngOnInit() {
    this.authorService.getAuthors().subscribe(t => {
      this.authors = t;
    });
    this.route.params.subscribe(t => {
      this.id = t["id"];
      this.bookService.getBook(this.id).subscribe(t => {
        this.book = t;
        this.myform = this.builder.group({
          id: [''],
          title: [this.book.title, Validators.required],
          description: [this.book.description, Validators.required],
          authorId: [this.book.authorId, Validators.required]
        })
      })
    })

  }
  onSubmit() {
    this.isFormSubmit = true;
    if (this.myform.get("authorId")?.value != "0" && this.myform.valid) {
      this.book = { ...this.book, ...this.myform.value }
      this.bookService.editBook(this.book);
      this.router.navigateByUrl("/books");
    }
  }
}
