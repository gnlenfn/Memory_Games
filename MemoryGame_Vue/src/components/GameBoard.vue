<template>
    <div class="board">
        <div class="memory-game">
            <div v-for="(card) in badges"
                 :key="card.id"
                 :class="{flip: card.flipped}"
                 class="memory-card"
                 @click="card.clickable ?  flipCard(card) : null"
            >
                <img
                    :data-framework="card"
                    :src="require(`@/assets/cards/${card.framework}.svg`)"
                    alt="#"
                    class="front-face"
                />
                <img
                    :src="require(`@/assets/cards/${jsBadge}.svg`)"
                    alt="#"
                    class="back-face"
                />
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "GameBoard",

    data() {
        return {
            isSelected: [],
            firstCard: null,
            secondCard: null,
            jsBadge: "js-badge",
            matchedCards: 0,
            lockBoard: false,
            hasFlippedCard: false,
        }
    },

    methods: {
        flipCard(c) {
            if (this.lockBoard) return;
            if (c === this.firstCard) return;
            if (!this.hasFlippedCard) {
                this.firstCard = c;
                this.hasFlippedCard = true;
                c.flipped = !c.flipped;
                return;
            }

            this.secondCard = c;
            c.flipped = !c.flipped;

            this.checkForMatch();
        },

        checkForMatch() {
            let isMatch = this.firstCard.framework === this.secondCard.framework;
            isMatch ? this.disableCards() : this.recoverCards();
        },

        disableCards() {
            this.$store.commit("MATCHED");
            this.firstCard.clickable = false;
            this.secondCard.clickable = false;
            this.resetSelected();
        },

        recoverCards() {
            this.lockBoard = true;

            setTimeout(() => {
                this.firstCard.flipped = !this.firstCard.flipped;
                this.secondCard.flipped = !this.secondCard.flipped;
                this.resetSelected();
            }, 750);
        },

        resetSelected() {
            [this.hasFlippedCard, this.lockBoard] = [false, false];
            [this.firstCard, this.secondCard] = [null, null];
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
        badges() {
            return this.$store.state.badges;
        }
    },

    created() {
        this.$store.commit("SHUFFLE");
    }
}
</script>

<style scoped>
.memory-game {
    width: 640px;
    height: 640px;
    display: flex;
    flex-wrap: wrap;
    perspective: 1000px;
    margin: 100px auto;
}

.memory-card {
    margin: 5px;
    transform: scale(1);
    transform-style: preserve-3d;
    transition: transform .5s;
    width: calc(25% - 10px);
    height: calc(25% - 10px);
}

.memory-card:active {
    transform: scale(0.97);
    transition: transform .2s;
}

.front-face,
.back-face {
    width: 70%;
    height: 70%;
    padding: 20px;
    border-radius: 5px;
    background: lightseagreen;
    backface-visibility: hidden;
}

.front-face {
    transform: rotateY(180deg);
    position: absolute;
}

.memory-card.flip {
    transform: rotateY(180deg);
}
</style>