<template>
    <div class="board">
        <div class="memory-game">
                <single-card
                    v-for="card in badges"
                    :key="card.id"
                    :card="card"
                />

<!--            <div v-for="(card) in badges"-->
<!--                 :key="card.id"-->
<!--                 :class="{flip: card.flipped}"-->
<!--                 class="memory-card"-->
<!--                 @click="card.clickable ?  flipCard(card) : null"-->
<!--            >-->
<!--                <img-->
<!--                    :data-framework="card"-->
<!--                    :src="require(`@/assets/cards/${card.framework}.svg`)"-->
<!--                    alt="#"-->
<!--                    class="front-face"-->
<!--                />-->
<!--                <img-->
<!--                    :src="require(`@/assets/cards/${jsBadge}.svg`)"-->
<!--                    alt="#"-->
<!--                    class="back-face"-->
<!--                />-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>

import SingleCard from "@/components/SingleCard";

export default {
    name: "GameBoard",
    components: {
        SingleCard
    },
    computed: {
        badges() {
            return this.$store.state.badges;
        }
    },
    // created() {
    //     this.$store.commit("SHUFFLE");
    // }
}
</script>

<style scoped>

</style>