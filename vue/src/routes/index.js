import { createWebHistory, createRouter } from "vue-router";

import Home from '@/components/HomePage.vue';
import menu from '@/components/menu.vue';



const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: "Home", component: Home },
        { path: '/menu', name: "menu", component: menu },
    ]


},
    
    


);

export default router;
