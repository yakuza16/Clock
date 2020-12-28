class Clock {
  constructor() {
    const clockElementsIds = {
      hoursId: "hours",
      minutesId: "minutes",
      secondsId: "seconds",
      clock: "clock",
      clockDigital: "clock-digital",
      clockDigitalHours: "digital-hours",
      clockDigitalMinutes: "digital-minutes",
      clockDigitalSeconds: "digital-seconds",
      switcher: "switch",
    };

    this.isDigitalClockVisible = false;

    this.currentHours = null;
    this.currentMinutes = null;
    this.currentSeconds = null;
    this.hoursHand = document.getElementById(clockElementsIds.hoursId);
    this.minutesHand = document.getElementById(clockElementsIds.minutesId);
    this.secondsHand = document.getElementById(clockElementsIds.secondsId);
    this.clock = document.getElementById(clockElementsIds.clock);
    this.clockDigital = document.getElementById(clockElementsIds.clockDigital);
    this.clockDigitalHours = document.getElementById(
      clockElementsIds.clockDigitalHours
    );
    this.clockDigitalMinutes = document.getElementById(
      clockElementsIds.clockDigitalMinutes
    );
    this.clockDigitalSeconds = document.getElementById(
      clockElementsIds.clockDigitalSeconds
    );
    this.switcher = document.getElementById(clockElementsIds.switcher);
    this.switcher.textContent = "Switch to digital clock".toUpperCase();
    this.switcher.addEventListener("click", () => this.switchClock());

    this.getActualTime();
    this.initializeClock();
    this.startTime();
  }

  switchClock() {
    if (!this.isDigitalClockVisible) {
      this.switcher.textContent = "Switch to wall clock".toUpperCase();
      this.clock.classList.add("clock--hidden");
      this.clockDigital.classList.add("clock-digital--active");
    } else {
      this.switcher.textContent = "Switch to digital clock".toUpperCase();
      this.clock.classList.remove("clock--hidden");
      this.clockDigital.classList.remove("clock-digital--active");
    }
    this.isDigitalClockVisible = !this.isDigitalClockVisible;
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
  }

  runDigitalClock() {
    this.clockDigitalHours.textContent =
      this.currentHours < 10
        ? `0${this.currentHours} :`
        : `${this.currentHours} :`;
    this.clockDigitalMinutes.textContent =
      this.currentMinutes < 10
        ? `0${this.currentMinutes} :`
        : `${this.currentMinutes} :`;
    this.clockDigitalSeconds.textContent =
      this.currentSeconds < 10
        ? `0${this.currentSeconds}`
        : this.currentSeconds;
  }

  startTime() {
    setInterval(() => {
      if (this.currentSeconds === 60) {
        this.currentSeconds = 0;
        this.currentMinutes++;
        this.minutesHand.style.transform = `rotate(calc(180deg + ${
          this.currentMinutes * 6
        }deg ))`;
        if (this.currentMinutes === 60) {
          this.currentMinutes = 0;
          this.currentHours++;
          this.hoursHand.style.transform = `rotate(calc(180deg + ${
            this.currentHours * 30 + this.currentMinutes / 2
          }deg ))`;
          if (this.currentHours === 12) {
            this.currentHours = 0;
            this.hoursHand.style.transform = `rotate(calc(180deg + ${
              this.currentHours * 30 + this.currentMinutes / 2
            }deg ))`;
          }
        }
      }
      this.currentSeconds++;
      this.runDigitalClock();
      this.secondsHand.style.transform = `rotate(calc(180deg + ${
        this.currentSeconds * 6
      }deg ))`;
    }, 1000);
  }
}
