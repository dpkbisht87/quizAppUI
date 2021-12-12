import { Quiz } from './model/quiz';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConductQuizService {
  quizList: Quiz[] = [];
  constructor() {}

  addNewQuiz(quiz: Quiz) {
    console.log('quiz ' + quiz);
    this.quizList.push(quiz);
    console.log('Current List ' + this.quizList);
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
