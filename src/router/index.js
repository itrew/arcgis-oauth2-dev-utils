import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/Main';

Vue.use(Router);

export default new Router({
  base: '/arcgis-oauth2-dev-utils/',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
  ],
});
