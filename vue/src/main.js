import { createApp } from 'vue'
import App from './App.vue'
import router from './routes';


const app = createApp(App);

// 여기에 추가
app.use(router);

app.mount('#app');
