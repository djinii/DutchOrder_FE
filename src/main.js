import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store'
import axios from 'axios';
import router from './router'

// createApp(App).use(router).mount('#app')

const app = createApp(App).use(router);
// const isLoggedIn = sessionStorage.getItem("setLoginStatus") === "true";
if(sessionStorage.getItem("setLoginStatus")){
    store.dispatch("authStore/updateLoginStatus", true);
}

app.use(store);
app.use(router);

app.config.globalProperties.axios = axios;

app.mount("#app");