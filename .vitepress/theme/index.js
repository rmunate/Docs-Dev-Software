import DefaultTheme from 'vitepress/theme'
import Autor from './../../components/Autor.vue';

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    ctx.app.component('Autor', Autor);
  }
}