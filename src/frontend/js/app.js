import App from './App.vue';
import Vue from 'vue';
import { createRouter } from '@/frontend/js/router';
import { createStore } from '@/frontend/js/store';
import { currency } from '@/frontend/js/filters/currency';
import { friendlyTime } from '@/frontend/js/filters/friendlyTime';
import { profit } from '@/frontend/js/filters/profit';
import { relativeTime } from '@/frontend/js/filters/relativeTime';
import { round } from '@/frontend/js/filters/round';

require('@babel/polyfill');

const router = createRouter();
const store = createStore();

Vue.filter('currency', currency);
Vue.filter('profit', profit);
Vue.filter('friendlyTime', friendlyTime);
Vue.filter('relativeTime', relativeTime);
Vue.filter('round', round);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
