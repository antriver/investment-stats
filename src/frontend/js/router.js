import Vue from 'vue';
import VueRouter from 'vue-router';

const createRouter = () => {
    Vue.use(VueRouter);

    const routes = [
        {
            name: 'home',
            path: '/',
            component: () => import('@frontend/views/HomeView.vue')
        },
    ];

    return new VueRouter({
        mode: 'history',
        routes
    });
};

export { createRouter };
