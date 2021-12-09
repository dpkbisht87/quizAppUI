import { Quiz } from './../shared/model/quiz';
import { ConductQuizService } from './../shared/conduct-quiz.service';
import { RestApiService } from './../shared/rest-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent  implements OnInit{
  @Input() item = '';
  presentedQuiz: Quiz;

  constructor(public restApi: RestApiService,
    public conductQuizService : ConductQuizService, private formBuilder: FormBuilder) { }

  checkoutForm = this.formBuilder.group({
    name: '',
    option1: '',
    option2: '',
    option3: '',
    option4: ''
  });

  ngOnInit(){
    this.presentedQuiz = this.conductQuizService.popQuiz();
    console.log('Presented Quiz '+ this.presentedQuiz.question.content)
    console.log('Presented Quiz '+ this.presentedQuiz.optionList[0].content)
  }

  onSubmit(): void {
    console.warn('Your answer  has been submitted')
  }
}
