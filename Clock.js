class Clock {
  constructor() {
    this.clockElementsIds = {
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
    this.currentHours = null;
    this.currentMinutes = null;
    this.currentSeconds = null;
    this.hoursHand = null;
    this.minutesHand = null;
    this.secondsHand = null;
    this.clock = null;
    this.clockDigital = null;
    this.clockDigitalHours = null;
    this.clockDigitalMinutes = null;
    this.clockDigitalSeconds = null;
    this.switcher = null;
    this.wrapperBlock = null;

    this.isDigitalClockVisible = false;
    this.isMoving = false;

    this.grabElements();

    this.windowProperty = {
      cursorPosX: 0,
      cursorPosY: 0,
      isDraggable: false,
      left: 0,
      top: 0,
      transformOffset: 0,
    };

    this.switcher.textContent = "Switch to digital clock".toUpperCase();
    this.switcher.addEventListener("click", () => this.switchClock());
    this.getActualTime();
    this.initializeClock();
    this.startTime();

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
      this.isMoving = !this.isMoving;
    });
  }

  grabElements() {
    this.movableBlock = document.getElementById(this.clockElementsIds.wrapper);
    this.hoursHand = document.getElementById(this.clockElementsIds.hoursId);
    this.minutesHand = document.getElementById(this.clockElementsIds.minutesId);
    this.secondsHand = document.getElementById(this.clockElementsIds.secondsId);
    this.clock = document.getElementById(this.clockElementsIds.clock);
    this.clockDigital = document.getElementById(
      this.clockElementsIds.clockDigital
    );
    this.clockDigitalHours = document.getElementById(
      this.clockElementsIds.clockDigitalHours
    );
    this.clockDigitalMinutes = document.getElementById(
      this.clockElementsIds.clockDigitalMinutes
    );
    this.clockDigitalSeconds = document.getElementById(
      this.clockElementsIds.clockDigitalSeconds
    );
    this.switcher = document.getElementById(this.clockElementsIds.switcher);
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
