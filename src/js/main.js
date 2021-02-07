const buttonRefs = {
  start: document.querySelector(`[data-action="start"]`),
  stop: document.querySelector(`[data-action="stop"]`),
  reset: document.querySelector(`[data-action="reset"]`),
}
buttonRefs.stop.setAttribute('disabled', true);
buttonRefs.reset.setAttribute('disabled', true);
class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.template = `
    <div class="flex">
    <div class="field">
      <span class="value time" data-value="days">000</span>
      <span class="label text">Days</span>
    </div>

    <div class="field">
      <span class="value time" data-value="hours">00</span>
      <span class="label text">Hours</span>
    </div>
  
    <div class="field">
      <span class="value time" data-value="mins">00</span>
      <span class="label text">Min</span>
    </div>
  
    <div class="field">
      <span class="value time" data-value="secs">00</span>
      <span class="label text">Sec</span></div>
      <div class="field">
      <span class="value time" data-value="ms">000</span>
      <span class="label text">MS</span></div>
      </div>`;
    this.selector = selector;
    this.root = document.querySelector(this.selector);
    this.root.insertAdjacentHTML(`beforeend`, this.template);
    this.refs = {
    days: this.root.querySelector('[data-value="days"]'),
    hours: this.root.querySelector('[data-value="hours"]'),
    mins: this.root.querySelector('[data-value="mins"]'),
    secs: this.root.querySelector('[data-value="secs"]'),
    ms: this.root.querySelector('[data-value="ms"]'),
    }
  }
    intervalId = null;
    timerIsActive = false;
  start() {
    buttonRefs.start.setAttribute('disabled',true);
    buttonRefs.stop.removeAttribute('disabled');
    buttonRefs.reset.removeAttribute('disabled');
    if (this.timerIsActive) {
      return;
      };
      this.timerIsActive = true;
      this.intervalId = setInterval(() => {
         const currentTime = Date.now();
         const deltaTime = this.targetDate - currentTime;
         if (deltaTime <= 0) {
           this.updateClock(0);
           return;
         }
            this.updateClock(deltaTime);
        }, 10)
  }
  stop() {
    buttonRefs.start.removeAttribute('disabled');
    buttonRefs.stop.setAttribute('disabled', true);
    buttonRefs.reset.removeAttribute('disabled');
    clearInterval(this.intervalId);
    this.timerIsActive = false;
  }
  reset() {
    buttonRefs.start.removeAttribute('disabled');
    buttonRefs.stop.setAttribute('disabled', true);
    buttonRefs.reset.setAttribute('disabled', true);
    clearInterval(this.intervalId);
    this.timerIsActive = false;
    this.refs.days.textContent = "000";
    this.refs.hours.textContent = "00";
    this.refs.mins.textContent = "00";
    this.refs.secs.textContent = "00";
    this.refs.ms.textContent = "000";
  }
    updateClock(time) {
      const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)),3);
      const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),2);
      const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),2);
      const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000),2);
      const ms = this.pad(Math.floor((time % (1000 * 60)%1000)),3);
      this.refs.days.textContent = days;
      this.refs.hours.textContent = hours;
      this.refs.mins.textContent = mins;
      this.refs.secs.textContent = secs;
      this.refs.ms.textContent = ms;
    }
    pad(value,n) {
        return String(value).padStart(n, '0')
  }
};
const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jan 01, 2022'),
});
buttonRefs.start.addEventListener('click', timer.start.bind(timer));
buttonRefs.stop.addEventListener('click', timer.stop.bind(timer));
buttonRefs.reset.addEventListener('click', timer.reset.bind(timer));
