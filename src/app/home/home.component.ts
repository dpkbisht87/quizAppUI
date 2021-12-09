import { ConductQuizService } from '../shared/conduct-quiz.service';
import { Quiz } from './../shared/model/quiz';
import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  quizStarted = false
  currentItem = 'Television';
  quizList: Quiz[];
  currentQuiz : Quiz;

  ngOnInit(): void {
    this.quizStarted = false
  }

  constructor(
    public restApi: RestApiService,
    public conductQuizService : ConductQuizService
  ) { }


  loadQuiz(){
    console.log('loadQuiz called')
    return this.restApi.loadQuiz().subscribe((data: Quiz[]) => {
      console.log(data)
      this.quizList = data;
      for (let i = 0; i < data.length; i++) {
        this.currentQuiz = data[i]

        console.log('Current quiz :'+ data[i].question.content)
        this.conductQuizService.addNewQuiz(data[i]);
      }

      this.quizStarted = true
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
