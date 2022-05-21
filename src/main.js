import { createApp } from 'vue'
import App from './App.vue'
import store from "./store";
// import { createStore} from 'vuex';

createApp(App).use(store).mount('#app')
