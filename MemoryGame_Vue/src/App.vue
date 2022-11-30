<template>
    <div id="app">
        <div>
            <stop-watch/>
            <br/>
            <div class="username">
                <input placeholder="Your Name" @keyup.enter="addUser" v-if="!$store.state.user"/>
                <p v-if="$store.state.user" class="current-user"> {{ this.$store.state.user }}</p>
                <button class="logout" v-if="$store.state.user" @click="logout">logout</button>
            </div>
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
        },
        logout() {
            this.$store.state.user = null;
        }
    }
}


</script>

<style>

</style>
