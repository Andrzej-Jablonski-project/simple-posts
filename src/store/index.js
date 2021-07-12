import Vue from 'vue';
import Vuex from 'vuex';
import { API_BASE_URL as API } from '@/const/assets';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allPosts: [],
    posts: [],
    authors: [],
    loading: true,
    errored: false,
    page: 1,
  },
  mutations: {
    setAllPosts(state, posts) {
      state.allPosts = posts;
    },

    setPosts(state, posts) {
      state.posts = posts;
    },

    setAuthors(state, authors) {
      state.authors = authors;
    },

    setLoading(state, loading) {
      state.loading = loading;
    },

    setErrored(state, errored) {
      state.errored = errored;
    },

    setPage(state, page) {
      state.page = page;
    },

    setFullText(state, index) {
      if (!state.posts[index].isFullText) {
        state.posts[index].isFullText = true;
      } else {
        state.posts[index].isFullText = false;
      }
    },
  },
  actions: {
    async getPosts(state) {
      try {
        const res = await fetch(`${API}posts?_page=${this.state.page}`, { method: 'GET' });

        if (!res.ok) throw new Error(`Error request, status: ${res.status}`);

        const data = await res.json();
        state.commit('setPosts', data);
      } catch (error) {
        console.log(error);
        state.commit('setErrored', true);
      } finally {
        state.commit('setLoading', false);
      }
    },

    async getAllPosts(state) {
      try {
        const res = await fetch(`${API}posts`, { method: 'GET' });

        if (!res.ok) throw new Error(`Error request, status: ${res.status}`);

        const data = await res.json();
        state.commit('setAllPosts', data);
      } catch (error) {
        console.log(error);
      }
    },

    async getAuthors(state) {
      try {
        const res = await fetch(`${API}users`, { method: 'GET' });

        if (!res.ok) throw new Error(`Error request, status: ${res.status}`);

        const data = await res.json();
        state.commit('setAuthors', data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {
  },

  getters: {
    getAllPosts: (state) => state.allPosts,
    getPosts: (state) => state.posts,
    getAuthors: (state) => state.authors,
    getLoading: (state) => state.loading,
    getErrored: (state) => state.errored,
  },
});
