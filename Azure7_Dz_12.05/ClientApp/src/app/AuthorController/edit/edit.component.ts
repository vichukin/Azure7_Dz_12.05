import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from '../../Services/AuthorService';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '../../Models/Author';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  constructor(private formBuilder: FormBuilder, private authorService: AuthorService, private router: Router, private route: ActivatedRoute) { }
  authorForm: FormGroup = this.formBuilder.group({
    id: [''] ,
    name: ['', Validators.required],
    yearOfBirth: ['', Validators.required]
  });
  id!: string
  author: Author = new Author('','',0);
  isFormSubmitted: boolean = false;
  ngOnInit() {
    this.route.params.subscribe(t => {
      this.id = t["id"];
    });
    this.authorService.getAuthor(this.id).subscribe(t => {
      this.author = t;
      this.authorForm = this.formBuilder.group({
        id: [this.id],
        name: [this.author.name, Validators.required],
        yearOfBirth: [this.author.yearOfBirth, Validators.required]
      });
      console.log(this.authorForm)
    });
    

  }
  onSubmit() {
    this.isFormSubmitted = true;
    //console.log(this.authorForm.get("name")?.valid);
    if (this.authorForm.valid) {
      this.author = { ...this.author, ...this.authorForm.value };
      //console.log(this.author);
      this.authorService.editAuthor(this.author);
      this.isFormSubmitted = false;
      this.router.navigateByUrl("/")
    }

  }
}
