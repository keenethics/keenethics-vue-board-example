import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';
import directives from './directives';
import router from './router';
import './style.css';

if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./api/server');
  await worker.start({ onUnhandledRequest: 'bypass' });
}

const app = createApp(App);

app.use(VueQueryPlugin);
app.use(router);
app.use(directives);

app.mount('#app');
