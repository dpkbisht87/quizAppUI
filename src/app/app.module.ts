import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';
import { ProblemComponent } from './problem/problem.component';
import { CountDownComponent } from './count-down/count-down.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProblemComponent,
    CountDownComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
