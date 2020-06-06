import Vue from 'vue';
import Vuex from 'vuex';

import MoviesStore from '@/store/MoviesStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    MoviesStore,
  },
  state: {
    user: {
      name: 'Bob Razowski',
      apiToken: '273b9080',
    },
  },
});
