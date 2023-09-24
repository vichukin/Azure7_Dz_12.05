import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Author } from '../../Models/Author';
import { AuthorService } from '../../Services/AuthorService';
import { combineLatest } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  constructor(private formBuilder: FormBuilder,private authorService:AuthorService, private router: Router) { }
  authorForm!: FormGroup;
  author!: Author;
  isFormSubmitted: boolean = false
  ngOnInit() {
    this.author = new Author("", "", 0);
    this.authorForm = this.formBuilder.group({
      id: [''],
      name: ["", Validators.required],
      yearOfBirth: ['', Validators.required]
    });

  }
  onSubmit() {
    this.isFormSubmitted = true;
    //console.log(this.authorForm.get("name")?.valid);
    if (this.authorForm.valid) {
      this.author = { ...this.author, ...this.authorForm.value };
      //console.log(this.author);
      this.authorService.createAuthor(this.author);
      this.isFormSubmitted = false;
      this.router.navigateByUrl("/")
    }
    
  }
}
