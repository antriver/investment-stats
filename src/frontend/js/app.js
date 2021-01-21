import { currency } from '@frontend/filters/currency';
import Vue from 'vue';
import App from './App.vue';
import { createRouter } from '@frontend/router';
import { createStore } from '@frontend/store';
import axios from 'axios';
import { profit } from '@frontend/filters/profit';
import { round } from '@frontend/filters/round';
import { relativeTime } from '@frontend/filters/relativeTime';

require('@babel/polyfill');

axios.defaults.baseURL = process.env.SERVER_URL;

const router = createRouter();
const store = createStore();

Vue.filter('currency', currency);
Vue.filter('profit', profit);
Vue.filter('relativeTime', relativeTime);
Vue.filter('round', round);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
