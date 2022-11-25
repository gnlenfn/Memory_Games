import Vue from 'vue'
import Vuex from 'vuex'
import cards from "@/assets/data.js";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        matchedCards: 0,
        ended: false,
        badges: cards,
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
            });
        },
    },
    actions: {},
    modules: {}
})
