import { createStore, Store } from 'vuex';

interface State {
  isDarkMode: boolean;
}

const store: Store<State> = createStore<State>({
  state: {
    isDarkMode: false
  },
  mutations: {
    toggleDarkMode(state: State) {
      state.isDarkMode = !state.isDarkMode;
    }
  },
  actions: {
    toggleDarkMode({ commit }: { commit: Function }) {
      commit('toggleDarkMode');
    }
  },
  modules: {}
});

export default store;
