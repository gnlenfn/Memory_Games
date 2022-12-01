<template>
    <div class="timer">
        <div class="stop-watch">
            <p>
                <span>{{ display }}:{{ displayMs }}</span>
            </p>
        </div>

        <div class="controls">
            <button
                v-if="!isStarted"
                class="watch-button color-button"
                @click="start"
                :disabled="this.$store.state.user === null"
            >
                Start
            </button>
            <button
                v-if="isStarted"
                class="watch-button"
                @click="reset"
            >
                Reset
            </button>
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
            ms: 0,
            targetTimestamp: 0,
            isStarted: false,
            interval: () => {
            }
        }
    },
    methods: {
        start() {
            this.targetTimestamp = Date.now();
            this.interval = setInterval(() => {
                this.updateDisplay();
            }, 10);
            this.isStarted = true;
            this.$store.commit("ENABLE_CLICK_AFTER_START");
        },
        pause() {
            clearInterval(this.interval);
        },
        reset() {
            if (this.isStarted) this.pause();
            this.stop();
            this.updateDisplay();
            this.$store.state.ended = false;
            this.$store.commit("RESET_BOARD");
            setTimeout(() => {
                this.$store.dispatch("CREATE_BADGES")
            }, this.TRANSITION_FLIP);
        },
        stop() {
            this.targetTimestamp = Date.now();
            this.$store.state.matchedCards = 0;
            this.isStarted = false;
        },
        updateDisplay() {
            const millisecond = (Date.now() - this.targetTimestamp);
            this.ms = Math.floor(millisecond);
            this.s = Math.floor(millisecond / 1000) % 60;
            this.m = Math.floor(millisecond / 60000);

            let display = this.s.toString().padStart(2, '0');
            display = this.m.toString().padStart(2, '0') + ':' + display;
            this.display = display;
            this.displayMs = ("00" + this.ms).slice(-2);
        },
        registerRecord() {
            this.$store.dispatch('REGISTER_RECORD', {key: this.$store.state.user});
        },
    },
    computed: {
        username() {
            return this.$store.state.user;
        },
        matchedCardsCount() {
            return Math.pow(2 * this.$store.state.level, 2)
        }
    },
    watch: {
        "$store.state.matchedCards"(value) {
            if (value === this.matchedCardsCount) {
                this.$store.state.ended = true;
                this.pause();

                this.$store.state.record = this.display + ":" + this.displayMs;
                console.log(this.$store.state.record);
                this.registerRecord();

                setTimeout(() =>
                    alert("Done!"), this.TRANSITION_FLIP);
            }
        }
    }
}
</script>

<style scoped>

</style>