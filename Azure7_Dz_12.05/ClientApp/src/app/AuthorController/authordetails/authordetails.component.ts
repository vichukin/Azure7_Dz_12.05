import { Component } from '@angular/core';
import { AuthorService } from '../../Services/AuthorService';
import { ActivatedRoute } from '@angular/router';
import { Author } from '../../Models/Author';

@Component({
  selector: 'app-authordetails',
  templateUrl: './authordetails.component.html',
  styleUrls: ['./authordetails.component.css']
})
export class AuthordetailsComponent {
  id: string = "";
  author!: Author; 
  constructor(private authorService: AuthorService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(t => {
      this.id = t["id"];
    });
    this.authorService.getAuthor(this.id).subscribe(t => {
      this.author = t;
    });
  }
}
