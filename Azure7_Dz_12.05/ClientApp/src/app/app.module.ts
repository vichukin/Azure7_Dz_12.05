import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SwaggerComponent } from './swagger/swagger.component';
import { AuthorsComponent } from './AuthorController/authors/authors.component';
import { AuthorService } from './Services/AuthorService';
import { CommonModule } from '@angular/common';
import { AuthordetailsComponent } from './AuthorController/authordetails/authordetails.component';
import { CreateComponent } from './AuthorController/create/create.component';
import { EditComponent } from './AuthorController/edit/edit.component';
import { BookIndexComponent } from './BookController/book-index/book-index.component';
import { BookCreateComponent } from './BookController/book-create/book-create.component';
import { BookEditComponent } from './BookController/book-edit/book-edit.component';
import { BookDetailComponent } from './BookController/book-detail/book-detail.component';
import { BookService } from './Services/BookService';

@NgModule({
  declarations: [
    AuthorsComponent,
    AuthordetailsComponent,
    CreateComponent,
    EditComponent,
    BookIndexComponent,
    BookDetailComponent,
    BookEditComponent,
    BookCreateComponent,
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '', component: AuthorsComponent, pathMatch: 'full'
      },
      {
        path: 'books',component: BookIndexComponent
      },
      {
        path: 'books/create', component: BookCreateComponent
      },
      {
        path: 'books/edit/:id', component: BookEditComponent
      },
      {
        path: 'books/:id', component: BookDetailComponent
      },
      {
        path: 'create', component: CreateComponent
      },
      
      {
        path: 'edit/:id',component: EditComponent
      },
      {
        path: ':id', component: AuthordetailsComponent
      },
      
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      {path: "swagger", component: SwaggerComponent}
    ])
  ],
  providers: [
    AuthorService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
