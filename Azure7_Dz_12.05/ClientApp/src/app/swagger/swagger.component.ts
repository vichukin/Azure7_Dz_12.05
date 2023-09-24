import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.css']
})
export class SwaggerComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Загрузите Swagger UI здесь, например, с помощью HttpClient
    this.http.get('http://localhost:44479/swagger').subscribe(data => {
      console.log(data);
    });
  }

}
