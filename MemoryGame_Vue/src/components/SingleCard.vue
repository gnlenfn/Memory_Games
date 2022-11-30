<template>
    <div
        :class="{flip: card.flipped}"
        class="memory-card"
        @click="card.clickable ?  flipCard(card) : null"
    >
        <img
            :data-framework="`${card}`"
            :src="require(`@/assets/cards/${card.framework}.svg`)"
            alt="#"
            class="front-face"
        />
        <img
            :src="require(`@/assets/cards/js-badge.svg`)"
            alt="#"
            class="back-face"
        />
    </div>

</template>

<script>
export default {
    props: [
        'card',
    ],
    data() {
        return {}
    },
    methods: {
        flipCard(c) {
            if (this.$store.state.lockBoard) return;
            if (c === this.$store.state.firstCard) return;
            if (!this.$store.state.hasFlippedCard) {

                this.$store.state.firstCard = c;
                this.$store.state.hasFlippedCard = true;

                c.flipped = !c.flipped;
                return;
            }

            this.$store.state.secondCard = c;
            c.flipped = !c.flipped;
            this.checkForMatch();
        },

        checkForMatch() {
            let isMatch = this.$store.state.firstCard.framework === this.$store.state.secondCard.framework;
            isMatch ? this.disableCards() : this.recoverCards();
        },

        disableCards() {
            this.$store.commit("MATCHED");
            this.$store.state.firstCard.clickable = false;
            this.$store.state.secondCard.clickable = false;
            this.resetSelected();
        },

        recoverCards() {
            this.$store.state.lockBoard = true;

            setTimeout(() => {
                this.$store.state.firstCard.flipped = !this.$store.state.firstCard.flipped;
                this.$store.state.secondCard.flipped = !this.$store.state.secondCard.flipped;
                this.resetSelected();
            }, this.AWAIT_WRONG);
        },

        resetSelected() {
            [this.$store.state.hasFlippedCard, this.$store.state.lockBoard] = [false, false];
            [this.$store.state.firstCard, this.$store.state.secondCard] = [null, null];
        },

        shuffle(arr) {
            arr.sort(() => Math.random() - 0.5);
        },

        resetBoard() {
            this.badges.forEach((card) => {
                card.flipped = false;
            });
        }
    },
}
</script>

<style scoped>

</style>