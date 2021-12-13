import { Quiz } from './model/quiz';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConductQuizService {
  quizList: Quiz[] = [];
  constructor() {}

  addNewQuiz(quiz: Quiz) {
    this.quizList.push(quiz);
  }

  getAllQuiz() {
    return this.quizList;
  }

  popQuiz() : Quiz {
    let quiz : any;
    if (this.quizList.length != 0) {
      quiz =  this.quizList.pop() || null;
    }
    return quiz;
  }

  clearCart() {
    this.quizList = [];
    return this.quizList;
  }
}
