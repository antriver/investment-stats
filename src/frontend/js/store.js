import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            player: null,

            room: null,
        },
        mutations: {
            setPlayer(state, player) {
                Vue.set(state, 'player', player);
            },

            setRoom(state, room) {
                Vue.set(state, 'room', room);
            },
        },
        actions: {},
    });
}
