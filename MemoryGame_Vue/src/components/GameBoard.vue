<template>
    <div class="board">
        <button
            class="arrow-buttons left-button"
            type="button"
            @click="moveNext(-1)"
        >
            <img src="@/assets/img/right-arrow.svg" alt=""/>
        </button>

        <div class="memory-game">
            <single-card
                v-for="card in badges"
                :key="card.id"
                :card="card"
            />
        </div>

        <button
            class="arrow-buttons right-button"
            type="button"
            @click="moveNext(1)"
        >
            <img src="@/assets/img/right-arrow.svg" alt=""/>
        </button>
    </div>
</template>

<script>

import SingleCard from "@/components/SingleCard";

export default {
    name: "GameBoard",
    components: {
        SingleCard
    },
    methods: {
        moveNext(n) {
            this.$store.dispatch('LEVEL_CTR', n);
            this.$store.dispatch('CREATE_BADGES');
        }
    },
    computed: {
        badges() {
            return this.$store.state.badges;
        }
    },
    created() {
        this.$store.dispatch('CREATE_BADGES');
    }
}
</script>

<style scoped>

</style>