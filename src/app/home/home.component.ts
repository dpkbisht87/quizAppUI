import { ConductQuizService } from '../shared/conduct-quiz.service';
import { Quiz } from './../shared/model/quiz';
import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
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
  ) {
  }


  loadQuiz(){
    console.log('loadQuiz called')
    return this.restApi.loadQuiz().subscribe((data: Quiz[]) => {
      this.quizList = data;
      for (let i = 0; i < data.length; i++) {
        this.currentQuiz = data[i]

        this.conductQuizService.addNewQuiz(data[i]);
      }
      this.quizStarted = true
    })
  }
}
