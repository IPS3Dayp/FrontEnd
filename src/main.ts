// main.ts

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import { auth0 } from './auth/auth';

const app = createApp(App);

// Use router
app.use(router);

// Use Auth0
app.use(auth0);

app.mount('#app');