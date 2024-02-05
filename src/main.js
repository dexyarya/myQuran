import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store';
import router from './router'
import Loading from './components/loadingComponent.vue'
// import 'dotenv/config'



createApp(App).use(router).use(store).component('loading-ceomponent', Loading).mount('#app')
