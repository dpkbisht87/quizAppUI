import { UserSubmission } from './../shared/model/user_submission';
import { RestApiService } from './../shared/rest-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  correctAnswers = 0
  incorrectAnswers = 0
  skippedAnswers = 0
  userId = -1
  constructor(public restApi: RestApiService) { }

  ngOnInit(): void {
    this.generateUserStatistics(1)
  }

  generateUserStatistics(userId: number){
    this.restApi.generateUserStatistics(userId).subscribe((userSubmissionList: UserSubmission[]) => {
      console.log(userSubmissionList);
      let current: UserSubmission;

      if (userSubmissionList.length > 0){
        this.userId = userId
      }

      for (let i = 0; i < userSubmissionList.length; i++) {
        current = userSubmissionList[i];
        if (current.status === 'CORRECT'){
          this.correctAnswers++;
        } else if(current.status === 'INCORRECT'){
          this.incorrectAnswers++;
        } else {
          this.skippedAnswers++;
        }
      //   this.currentQuiz = data[i]

      //   console.log('Current quiz :'+ data[i].question.content)
      //   this.conductQuizService.addNewQuiz(data[i]);
      }
      console.log('correctAnswers :' + this.correctAnswers + ', incorrectAnswers :' + this.incorrectAnswers + ', skippedAnswers :' + this.skippedAnswers);
    })
  }
}
