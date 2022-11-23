<template>
  <div class="board">

    <div class="memory-game">
<!--      각각 뒤집기?-->
      <div class="memory-card"
           v-for="(card) in badges"
           :class="{flip: card.flipped}"
           :key="card.id"
           @click="card.clickable ?  flipCard(card) : null"
      >
        <img
            class="front-face"
            :src="require(`@/assets/cards/${card.framework}.svg`)"
            :data-framework="card"
            alt="#"
        />
        <img
            class="back-face"
            :src="require(`@/assets/cards/${jsBadge}.svg`)"
            alt="#"
        />
      </div>
    </div>
  </div>
</template>

<script>
import cards from "@/assets/data.js";

export default {
  name: "GameBoard",

  data() {
    return {
      badges: cards,
      isSelected: [],
      firstCard: null,
      secondCard: null,
      jsBadge: "js-badge",
      matchedCards: 0,
    }
  },
  // beforeMount(){
  //   console.log(this.firstCard.id, this.secondCard.id);
  // },

  methods: {
    flipCard(c) {

      if (c === this.firstCard) return;
      if (!this.firstCard) {
        this.firstCard = c;
        this.toggleSelected(c);
        // console.log("first")
        return;
      }

      this.secondCard = c;
      this.toggleSelected(c);
      // console.log("second");
      this.checkForMatch();
    },

    toggleSelected(card) {
      // console.log(card);
      // if(this.isSelected.includes(card.id)) {
      //   this.isSelected = this.isSelected.filter(s => s !== card.id);
      // }
      // else {
      //   this.isSelected.push(card.id);
      // }
      card.flipped = !card.flipped;
      // console.log(this.isSelected);
    },

    checkForMatch(){
      let isMatch = this.firstCard.framework === this.secondCard.framework;
      console.log(isMatch);
      isMatch ? this.disableCards() : this.recoverCards();
    },

    disableCards() {
      this.matchedCards += 2;
      this.firstCard.clickable = false;
      this.secondCard.clickable = false;
    },

    recoverCards() {
      setTimeout(() => {
        this.toggleSelected(this.firstCard);
        this.toggleSelected(this.secondCard);
      }, 750);
    },

    shuffle(arr) {
      arr.sort(() => Math.random() -0.5);
    }
  },

  created() {
    this.shuffle(this.badges)
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
  margin: 5px;transform: scale(1);
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