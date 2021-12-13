import { Component, OnDestroy, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnDestroy {

  @Output() timerExpiredEvent = new EventEmitter<string>();

  intervalId = 0;
  message = '';
  seconds = 15;

  ngOnDestroy() {
    this.clearTimer();
  }

  public start() {
    this.countDown();
  }

  public stop()  {
    this.seconds = 15
  }

  private clearTimer() { clearInterval(this.intervalId); }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = 'Blast off!';
        this.timerExpired();
      }
    }, 1000);
  }

  timerExpired(){
    this.timerExpiredEvent.emit();
  }
}
