const MAX_SECONDS = 60;
const MAX_MINUTES = 60;
const MAX_WALL_CLOCK_HOURS = 60;
const CLOCK_ELEMENTS_ID = {
  hoursId: "hours",
  minutesId: "minutes",
  secondsId: "seconds",
  clock: "clock",
  clockDigital: "clock-digital",
  clockDigitalHours: "digital-hours",
  clockDigitalMinutes: "digital-minutes",
  clockDigitalSeconds: "digital-seconds",
  switcher: "switch",
  wrapper: "wrapper",
};

class Clock {
  constructor() {
    this.currentHours = null;
    this.currentMinutes = null;
    this.currentSeconds = null;
    this.isDigitalClockVisible = false;
    this.isMoving = false;
    this.windowProperty = {
      cursorPosX: 0,
      cursorPosY: 0,
      left: 0,
      top: 0,
      transformOffsetX: 0,
      transformOffsetY: 0,
    };
    this.grabElements();
    this.getActualTime();
    this.initializeClock();
    this.startTime();
    this.addListeners();
  }

  addListeners() {
    this.switcher.addEventListener("click", () => this.switchClock());

    this.movableBlock.addEventListener("mousedown", (event) => {
      this.isMoving = !this.isMoving;
      const {
        top,
        left,
        width,
        height,
      } = this.movableBlock.getBoundingClientRect();
      this.windowProperty = {
        cursorPosX: event.clientX,
        cursorPosY: event.clientY,
        left,
        top,
        transformOffsetX: width / 2,
        transformOffsetY: height / 2,
      };
    });

    this.movableBlock.addEventListener("mousemove", (e) => {
      if (!this.isMoving) {
        return;
      }
      this.movableBlock.style.left = `${
        e.clientX -
        this.windowProperty.cursorPosX +
        this.windowProperty.left +
        this.windowProperty.transformOffsetX
      }px`;
      this.movableBlock.style.top = `${
        e.clientY -
        this.windowProperty.cursorPosY +
        this.windowProperty.top +
        this.windowProperty.transformOffsetY
      }px`;
    });

    this.movableBlock.addEventListener("mouseup", () => {
      this.isMoving = false;
    });
    this.movableBlock.addEventListener("mouseleave", () => {
      this.isMoving = false;
    });
  }

  grabElements() {
    this.movableBlock = document.getElementById(CLOCK_ELEMENTS_ID.wrapper);
    this.hoursHand = document.getElementById(CLOCK_ELEMENTS_ID.hoursId);
    this.minutesHand = document.getElementById(CLOCK_ELEMENTS_ID.minutesId);
    this.secondsHand = document.getElementById(CLOCK_ELEMENTS_ID.secondsId);
    this.clock = document.getElementById(CLOCK_ELEMENTS_ID.clock);
    this.clockDigital = document.getElementById(CLOCK_ELEMENTS_ID.clockDigital);
    this.clockDigitalHours = document.getElementById(
      CLOCK_ELEMENTS_ID.clockDigitalHours
    );
    this.clockDigitalMinutes = document.getElementById(
      CLOCK_ELEMENTS_ID.clockDigitalMinutes
    );
    this.clockDigitalSeconds = document.getElementById(
      CLOCK_ELEMENTS_ID.clockDigitalSeconds
    );
    this.switcher = document.getElementById(CLOCK_ELEMENTS_ID.switcher);
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
      if (this.currentSeconds === MAX_SECONDS) {
        this.currentSeconds = 0;
        this.currentMinutes++;
        this.minutesHand.style.transform = `rotate(calc(180deg + ${
          this.currentMinutes * 6
        }deg ))`;
        if (this.currentMinutes === MAX_MINUTES) {
          this.currentMinutes = 0;
          this.currentHours++;
          this.hoursHand.style.transform = `rotate(calc(180deg + ${
            this.currentHours * 30 + this.currentMinutes / 2
          }deg ))`;
          if (this.currentHours === MAX_WALL_CLOCK_HOURS) {
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
