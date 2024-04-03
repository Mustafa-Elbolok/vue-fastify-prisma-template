import { createApp } from 'vue';
import BalmUI from 'balm-ui';
import router from './framework/router';
import App from './App.vue';
import ToastPlugin from 'vue-toast-notification';

import 'balm-ui/dist/balm-ui.css';
import './style.css';
import { createPinia } from 'pinia';

const app = createApp(App);

app.use(BalmUI);
app.use(router);
app.use(createPinia());
app.use(ToastPlugin);

app.mount('#app');
