class Clock {
  constructor() {
    const clockElementsIds = {
      hoursId: "hours",
      minutesId: "minutes",
      secondsId: "seconds",
    };

    this.currentHours = new Date().getHours();
    this.currentMinutes = new Date().getMinutes();
    this.currentSeconds = new Date().getSeconds();

    this.hoursHand = document.getElementById(clockElementsIds.hoursId);
    this.minutesHand = document.getElementById(clockElementsIds.minutesId);
    this.secondsHand = document.getElementById(clockElementsIds.secondsId);

    this.initializeClock();

    console.log(this.currentHours);
  }

  initializeClock() {
    this.secondsHand.style.transform = `rotate(calc(180deg + ${
      this.currentSeconds * 6
    }deg ))`;

    this.minutesHand.style.transform = `rotate(calc(180deg + ${
      this.currentMinutes * 6
    }deg ))`;

    this.hoursHand.style.transform = `rotate(calc(180deg + ${
      this.currentHours * 30
    }deg ))`;
  }
}
