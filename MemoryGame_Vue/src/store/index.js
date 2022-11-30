import Vue from 'vue'
import Vuex from 'vuex'
import cards from "@/assets/data.js";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        matchedCards: 0,
        ended: false,
        badges: cards,
        firstCard: null,
        secondCard: null,
        lockBoard: false,
        hasFlippedCard: false,
        selected: [],
        record: "00:00:00",
    },
    getters: {},
    mutations: {
        MATCHED(state) {
            state.matchedCards += 2;
            if (state.matchedCards === 16) {
                state.ended = true;
            }
        },
        CLEAR_MATCHED(state) {
            state.matchedCards = 0;
        },
        RESET_BOARD(state) {
            state.badges.forEach((card) => {
                card.flipped = false;
                card.clickable = false;
            });
        },
        ENABLE_CLICK_AFTER_START(state) {
            state.badges.forEach((card) => {
                card.clickable = true;
            });
        },
        SHUFFLE(state) {
            state.badges.sort(() => Math.random() - 0.5);
        },

        SAVE_RECORD(context, {parsed, key}) {
            if (parsed.length > 5) {
                parsed.pop();
            }
            localStorage.setItem(key, JSON.stringify(parsed));
        },
    },
    actions: {
        REGISTER_RECORD({commit, state}, {key}) {
            let totalRank = localStorage.getItem('total');
            let userRank = localStorage.getItem(key);
            let totalParsed, userParsed;

            if (totalRank === null) {
                totalParsed = [];
            } else {
                totalParsed = JSON.parse(totalRank);
            }

            if (userRank === null) {
                userParsed = [];
            } else {
                userParsed = JSON.parse(userRank);
            }

            const tmp = {
                user: key,
                record: state.record
            }

            totalParsed.push(tmp);
            userParsed.push(tmp);

            function compare (a, b) {
                if(a.record > b.record) return 1;
                if(a.record < b.record) return -1;
                return 0
            }
            totalParsed = totalParsed.sort(compare);
            userParsed = userParsed.sort(compare);

            commit('SAVE_RECORD', {parsed: totalParsed, key: 'total'})
            commit('SAVE_RECORD', {parsed: userParsed, key: key})

        },
    },
    modules: {}
})
