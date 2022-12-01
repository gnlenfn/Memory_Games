<template>
    <div class="board">
        <div class="memory-game">
                <single-card
                    v-for="card in badges"
                    :key="card.id"
                    :card="card"
                />
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
    created() {
        this.$store.commit("SHUFFLE");
    }
}
</script>

<style scoped>

</style>