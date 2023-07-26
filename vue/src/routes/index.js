import { createWebHistory, createRouter } from "vue-router";
import Home from '@/components/HomePage.vue';
import type1 from '@/components/type1.vue';
import test from '@/components/test.vue';
import test2 from '@/components/test2.vue';

const routes = [
    { path: '/', name: "test2", component: test2 },
    { path: '/type1', name: "type1", component: type1 },
    { path: '/test', name: "test", component: test },
    { path: '/home', name: "Home", component: Home },

]

const router = createRouter({
    history: createWebHistory(),
    routes,


});

export default router;
