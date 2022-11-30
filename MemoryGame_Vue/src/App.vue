<template>
    <div id="app">
        <div>
            <stop-watch/>
            <br/>
            <input @keyup.enter="addUser" v-if="!$store.state.user"/>
            <p v-if="$store.state.user" class="current-user"> {{ this.$store.state.user }}</p>
        </div>
        <div class="container">
            <div/>
            <game-board/>
            <rank/>
        </div>
    </div>
</template>

<script>
import StopWatch from "@/components/StopWatch";
import GameBoard from "@/components/GameBoard";
import Rank from "@/components/Rank";

export default {
    components: {
        StopWatch,
        GameBoard,
        Rank
    },
    methods: {
        addUser(e) {
            this.$store.state.user = e.target.value;
        }
    }
}


</script>

<style>

</style>
