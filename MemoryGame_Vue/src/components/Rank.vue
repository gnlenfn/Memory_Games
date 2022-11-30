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
                <span>{{ record.user }} : {{ record.record }}</span>
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
                <span>{{ record.user }} : {{ record.record }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Leader-Board",
    data() {
        return {
            userMode: false,
        }
    },
    methods: {
        toggle() {
            if (this.user === null) {
                return;
            }
            this.userMode = !this.userMode;
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        totalRecords() {
            return JSON.parse(localStorage.getItem('total'));
        },
        userRecords() {
            return JSON.parse(localStorage.getItem(this.user))
        }
    }
}
</script>

<style scoped>

</style>