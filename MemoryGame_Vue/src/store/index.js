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

        // REGISTER_TOTAL_RECORD(state) {
        //     let rank = localStorage.getItem('total');
        //     let parsed;
        //     parsed = [];
        //
        //     if (rank !== null) {
        //         parsed = JSON.parse(rank);
        //     }
        //
        //     parsed.push(state.record);
        //
        //     localStorage.setItem("total", state.record);
        //     localStorage.setItem(`${state.user}`, state.record);
        // },
        // REGISTER_USER_RECORD(state, key) {
        //     let rank = localStorage.getItem(key);
        //     let parsed;
        //
        //     if (rank === null) {
        //         parsed = [];
        //     } else {
        //         parsed = JSON.parse(rank);
        //     }
        //     parsed.push(state.record);
        // },
        SAVE_RECORD({parsed, key}) {
            console.log("save!")
            console.log(parsed)
            console.log(key)
            parsed.sort();
            if (parsed.length > 5) {
                parsed.pop();
            }
            localStorage.setItem(key, JSON.stringify(parsed));
        },
        registerRecord(state, key) {
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

            console.log(totalParsed)
            if (totalParsed.length > 5) {
                totalParsed.pop();
            }
            if (userParsed.length > 5) {
                userParsed.pop();
            }

            localStorage.setItem("total", JSON.stringify(totalParsed));
            localStorage.setItem(key, JSON.stringify(userParsed));

            // commit("SAVE_RECORD",{totalParsed, key});
        }
    },
    actions: {
        // registerRecord({state}, key) {
        //     let totalRank = localStorage.getItem('total');
        //     let userRank = localStorage.getItem(key);
        //     let totalParsed, userParsed;
        //
        //     if (totalRank === null) {
        //         totalParsed = [];
        //     } else {
        //         totalParsed = JSON.parse(totalRank);
        //     }
        //     console.log(totalParsed);
        //
        //     if (userRank === null) {
        //         userParsed = [];
        //     } else {
        //         userParsed = JSON.parse(userRank);
        //     }
        //
        //     totalParsed.push(state.record);
        //     userParsed.push(state.record);
        //     totalParsed.sort();
        //     userParsed.sort();
        //
        //     if (totalParsed.length > 5) {
        //         totalParsed.pop();
        //     }
        //     if (userParsed.length > 5) {
        //         userParsed.pop();
        //     }
        //
        //     localStorage.setItem("total", totalParsed);
        //     localStorage.setItem(key, userParsed);
        //
        //     // commit("SAVE_RECORD",{totalParsed, key});
        // }
    },
    modules: {}
})
