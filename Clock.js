class Clock {
  constructor() {
    const clockElementsIds = {
      hoursId: "hours",
      minutesId: "minutes",
      secondsId: "seconds",
    };

    this.currentHours = null;
    this.currentMinutes = null;
    this.currentSeconds = null;
    this.hoursHand = document.getElementById(clockElementsIds.hoursId);
    this.minutesHand = document.getElementById(clockElementsIds.minutesId);
    this.secondsHand = document.getElementById(clockElementsIds.secondsId);

    this.getActualTime();
    this.initializeClock();
    this.startTime();
  }

  getActualTime() {
    const currentFullTime = new Date();
    this.currentHours = currentFullTime.getHours();
    this.currentMinutes = currentFullTime.getMinutes();
    this.currentSeconds = currentFullTime.getSeconds();
  }

  initializeClock() {
    this.secondsHand.style.transform = `rotate(calc(180deg + ${
      this.currentSeconds * 6
    }deg ))`;

    this.minutesHand.style.transform = `rotate(calc(180deg + ${
      this.currentMinutes * 6
    }deg ))`;

    this.hoursHand.style.transform = `rotate(calc(180deg + ${
      this.currentHours * 30 + this.currentMinutes / 2
    }deg ))`;

    console.log(this.secondsHand.style.transform, this.currentSeconds);
  }

  startTime() {
    setInterval(() => {
      if (this.currentSeconds >= 60) {
        this.currentSeconds = 0;
        this.currentMinutes++;
        this.minutesHand.style.transform = `rotate(calc(180deg + ${
          this.currentMinutes * 6
        }deg ))`;
        if (this.currentMinutes >= 60) {
          this.currentMinutes = 0;
          this.currentHours++;
          this.hoursHand.style.transform = `rotate(calc(180deg + ${
            this.currentHours * 30 + this.currentMinutes / 2
          }deg ))`;
          if (this.currentHours >= 12) {
            this.currentHours = 0;
            this.hoursHand.style.transform = `rotate(calc(180deg + ${
              this.currentHours * 30 + this.currentMinutes / 2
            }deg ))`;
          }
        }
      }
      this.currentSeconds++;
      this.secondsHand.style.transform = `rotate(calc(180deg + ${
        this.currentSeconds * 6
      }deg ))`;

      console.log(this.currentSeconds);
      console.log(this.currentMinutes);
      console.log(this.currentHours);
    }, 1000);
  }
}
