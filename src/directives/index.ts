import type { App } from 'vue';
import ripple from './ripple';

export default {
  install: (app: App): void => {
    app.directive('ripple', ripple);
  },
};
