import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/axios"

// Add version query parameter to force browser cache refresh
const appVersion = Date.now();
window.__APP_VERSION = appVersion;

// Add app version to the window object for debugging
console.log(`App Version: ${appVersion}`);

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');

// npm install vue-router