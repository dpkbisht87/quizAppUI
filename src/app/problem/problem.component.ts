import { Answer } from './../shared/model/answer';
import { UserSubmission } from './../shared/model/user_submission';
import { Quiz } from './../shared/model/quiz';
import { ConductQuizService } from './../shared/conduct-quiz.service';
import { RestApiService } from './../shared/rest-api.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent  implements OnInit {
  presentedQuiz: Quiz;
  quizCompleted = false

  // userSubmission : UserSubmission;
  questionId : number;
  submittedAnswerId: number;
  status: string;
  lifelines: string[];
  selectedOption?: any;
  showAnswer: boolean = false;
  isLastQuestion: boolean = false;

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
    console.log('Presented Quiz '+ this.presentedQuiz.question.content)
    this.questionId = this.presentedQuiz.question.id;
    this.submittedAnswerId = this.presentedQuiz.correctAnswer.id;

    // this.lifelines.push('FIFTY-FIFTY');
    this.selectedOption = {id: -1, content : ''}
    console.log('Presented Quiz '+ this.presentedQuiz.optionList[0].content)
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

    if (this.conductQuizService.quizList.length == 1){
      this.isLastQuestion = true
    }
    if (this.conductQuizService.quizList.length > 0){
      this.presentNewQuestion();

    } else {
      this.quizCompleted = true
    }
  }


  onSelect(option: Answer): void {
    this.showAnswer = true;
    this.selectedOption = option
  }
}
