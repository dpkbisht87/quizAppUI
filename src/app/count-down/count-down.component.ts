import { AfterContentChecked, AfterViewChecked, Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})
export class CountDownComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  public dateNow = new Date();
  public dDay = new Date();
  milliSecondsInASecond = 1000;
  SecondsInAMinute  = 60;

  public timeDifference;
  public secondsToDday;

  private getTimeDifference () {
      let seconds = this.dateNow.getTime();
      seconds = seconds + (16 * 1000);
      let then = new Date(seconds);
      this.timeDifference = then.getTime() - new  Date().getTime();
      if (this.timeDifference <= 1){
        this.subscription.unsubscribe();
      }
      this.allocateTimeUnits(this.timeDifference);
  }

private allocateTimeUnits (timeDifference) {
      this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
}

  ngOnInit() {
     this.subscription = interval(1)
         .subscribe(x => { this.getTimeDifference(); });
  }

 ngOnDestroy() {
    this.subscription.unsubscribe();
 }

}
