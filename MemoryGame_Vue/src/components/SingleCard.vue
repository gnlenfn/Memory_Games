<template>
    <div
        :class="{flip: card.flipped}"
        class="memory-card"
        :data-framework="`${card}`"
        @click="card.clickable ?  flipCard(card) : null"
        :style="cardSize"
    >
        <img
            :src="require(`@/assets/img/cards/${card.framework}.svg`)"
            alt="#"
            class="front-face"
        />
        <img
            :src="require(`@/assets/img/cards/js-badge.svg`)"
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

            if (this.isMatch()) {
                this.disableCards();
            } else {
                this.recoverCards();
            }
        },

        isMatch() {
             return this.$store.state.firstCard.framework === this.$store.state.secondCard.framework;
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
    computed: {
        cardSize() {
            return {
                '--size': Math.floor(100 / (2 * this.$store.state.level)) + '%'
            }
        }
    }
}
</script>

<style scoped>


</style>