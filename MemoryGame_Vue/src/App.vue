<template>
    <div id="app">
        <div>
            <stop-watch/>
            <br/>
            <input @keyup.enter="addUser" v-if="!$store.state.user"/>
            <p v-if="$store.state.user"> {{ this.$store.state.user }}</p>
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
body {
    background: cadetblue;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

}

nav {
    padding: 30px;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
}

nav a.router-link-exact-active {
    color: #42b983;
}

.container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 16px;
}
</style>
