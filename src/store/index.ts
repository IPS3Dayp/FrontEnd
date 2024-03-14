// store/index.ts

import { createStore } from 'vuex';

interface State {
  isDarkMode: boolean;
}

const store = createStore<State>({
  state: {
    isDarkMode: false
  },
  mutations: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    }
  },
  actions: {
    toggleDarkMode({ commit }) {
      commit('toggleDarkMode');
    }
  },
  modules: {}
});

export default store;