<template>
  <div>
    <div class="stop-watch">
      <p>
        <span>{{display}}:{{displayMs}}</span>
      </p>
    </div>

    <div class="controls">
      <button class="watch-button color-button" @click="start" v-if="isStopped">Start</button>
      <button class="watch-button" @click="stop" v-if="!isStopped">Reset</button>
    </div>
  </div>
</template>

<script>

export default {
  props: [
      'id'
  ],
  data() {
    return {
      title: "Timer",
      display: "00:00",
      displayMs: "00",
      m: 0,
      s: 0,
      DEFAULT_SECONDS: 0,
      targetTimestamp: 0,
      isStarted: false,
      isStopped: true,
      interval: () => {}
    }
  },
  methods: {
    start() {
      this.targetTimestamp = Date.now() - this.DEFAULT_SECONDS;
      this.interval = setInterval(() => {
        this.updateDisplay();
      }, 10);
      this.isStarted = true;
      this.isStopped = false;
    },
    pause() {
      clearInterval(this.interval);
      this.updateDisplay();
      this.isStarted = false;
    },
    stop() {
      if(this.isStarted) this.pause();
      this.reset();
      this.updateDisplay();
      this.isStopped = true;
    },
    reset() {
      this.targetTimestamp = Date.now() + this.DEFAULT_SECONDS;
    },
    updateDisplay() {
      const s = Math.abs(Date.now() - this.targetTimestamp) / 1000;
      this.ms = Math.floor((s % 10) * 1000);
      this.s = Math.floor(s % 60);
      this.m = Math.floor(s / 60) % 60;

      let display = this.s.toString().padStart(2, '0');
      display = this.m.toString().padStart(2, '0') + ':' + display;
      this.display = display;
      this.displayMs = ("00" + this.ms).slice(-2);
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Boogaloo&display=swap');
.stop-watch {
  font-family: "Boogaloo", cursive;
  grid-column-end: span 3;
}
span {
  font-size: 100px;
}

.watch-button {
  border: none;
  margin: auto;
  width: 100px;
  padding: 10px 20px;
  border-radius: 15px;
  font-family: "Boogaloo", cursive;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  font-weight: 600;
  font-size: 25px;
  background-color: floralwhite;
  z-index: 5;
}
.watch-button:active {
  transform: translateY(2px) ;
}
.color-button {
  background-color: yellowgreen;
}
</style>