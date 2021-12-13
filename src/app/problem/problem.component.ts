import { Answer } from './../shared/model/answer';
import { UserSubmission } from './../shared/model/user_submission';
import { Quiz } from './../shared/model/quiz';
import { ConductQuizService } from './../shared/conduct-quiz.service';
import { RestApiService } from './../shared/rest-api.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { AfterViewInit, ViewChild } from '@angular/core';
import { CountdownTimerComponent } from "./countdown-timer/countdown-timer.component";

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent  implements OnInit {
  presentedQuiz: Quiz;
  quizCompleted = false

  @ViewChild(CountdownTimerComponent)
  private timerComponent: CountdownTimerComponent;

  seconds() { return 0; }

  ngAfterViewInit() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
    this.timerComponent.start();
  }

  start() { this.timerComponent.start(); }
  stop() { this.timerComponent.stop(); }

  // userSubmission : UserSubmission;
  questionId : number;
  submittedAnswerId: number;
  status: string;
  lifelines: string[];
  selectedOption?: any;
  showAnswer: boolean = false;
  isLastQuestion: boolean = false;
  nextClicked : boolean = false

  constructor(public restApi: RestApiService,
    public conductQuizService : ConductQuizService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  checkoutForm = this.formBuilder.group({
    name: '',
    option1: '',
    option2: '',
    option3: '',
    option4: ''
  });

  ngOnInit(){
    this.presentNewQuestion();
  }



  presentNewQuestion(){
    this.presentedQuiz = this.conductQuizService.popQuiz();
    this.questionId = this.presentedQuiz.question.id;
    this.submittedAnswerId = this.presentedQuiz.correctAnswer.id;

    // this.lifelines.push('FIFTY-FIFTY');
    this.selectedOption = {id: -1, content : ''}
  }


  onNext(): void {
    let userId =  1
    this.submittedAnswerId = this.selectedOption.id;
    if( this.submittedAnswerId != -1){
      if (this.submittedAnswerId === this.presentedQuiz.correctAnswer.id){
        this.status = 'CORRECT'
      } else {
        this.status = 'INCORRECT'
      }
    } else {
      this.status = 'SKIPPED'
    }
    let userSubmission = new UserSubmission(userId, this.questionId, this.submittedAnswerId, this.status, this.lifelines)
    this.showAnswer = false
    this.restApi.saveAnswer(userSubmission).subscribe((data: {}) => {
      console.log(data)
    });
    this.stop();
    if (this.conductQuizService.quizList.length == 1){
      this.isLastQuestion = true
    }
    if (this.conductQuizService.quizList.length > 0){
      this.presentNewQuestion();
      this.start();
    } else {
      this.quizCompleted = true
    }
    this.nextClicked = true

  }


  onSelect(option: Answer): void {
    this.showAnswer = true;
    this.selectedOption = option
  }

}
