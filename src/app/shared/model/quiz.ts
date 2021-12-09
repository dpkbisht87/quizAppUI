import { Answer } from './answer';
import { Question } from './question';

export class Quiz {
  constructor(
    public question: Question,
    public optionList: Answer[],
    public correctAnswer: Answer
  ) {}
}
