<template>
    <div class="leader-board">
        <div
            @click="toggle"
            v-if="!userMode"
        >
            <h1>LEADERBOARD</h1>
            <div
                class="total-record-list"
                v-for="(record, idx) in totalRecords"
                :key="idx"
            >
                <span>{{ record }}</span>
            </div>
        </div>
        <div
            @click="toggle"
            v-if="userMode"
        >
            <h1>YOUR RECORD</h1>
            <div
                class="user-record-list"
                v-for="(record, idx) in userRecords"
                :key="idx"
            >
                <span>{{ record }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Leader-Board",
    data() {
        return {
            user: this.$store.state.user,
            userMode: false,
            totalRecords: JSON.parse(localStorage.getItem('total')),
            userRecords: JSON.parse(localStorage.getItem(this.user)),
        }
    },
    methods: {
        toggle() {
            this.userMode = !this.userMode;
        }
        }
}
</script>

<style scoped>

</style>