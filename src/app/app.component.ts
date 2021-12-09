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
      // this.Stock = data;
      // let i = 1
      // console.log('id: ' + this.Stock[i].id);
      // console.log('name: ' + this.Stock[i].name);
      // console.log('currentPrice: ' + this.Stock[i].currentPrice);
      // console.log('lastUpdate: ' + this.Stock[i].lastUpdate);
      // console.log('locked: ' + this.Stock[i].locked);
    })
  }
}

