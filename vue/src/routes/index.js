import { createWebHistory, createRouter } from "vue-router";
import Home from '@/components/HomePage.vue';
import type1 from '@/components/type1.vue';
import test from '@/components/test.vue';

const routes = [
    { path: '/', name: "Home", component: Home },
    { path: '/type1', name: "type1", component: type1 },
    { path: '/test', name: "test", component: test },

]

const router = createRouter({
    history: createWebHistory(),
    routes,


});

export default router;
