import { Component } from '@angular/core';
import { RestApiService } from './shared/rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz-application-web';

  constructor(
    public restApi: RestApiService
  ) { }


  loadQuiz(){
    console.log('loadQuiz called')
    return this.restApi.loadQuiz().subscribe((data: {}) => {
      console.log(data)
    })
  }
}

