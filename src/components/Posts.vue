<template>
  <div class="container">
    <div v-if="errored">
      <p>
        We're sorry, we're not able to retrieve this information at the moment,
        please try back later
      </p>
    </div>
    <div v-else>
      <div class="loading" v-if="loading">Loading...</div>
    </div>
    <section v-for="(post, index) in posts" :key="post.id">
      <h2 >title: {{post.title}}
        <button @click="deletePost(index, post.id)">Delete</button>
      </h2>
      <span v-for="person in authors" :key="person.id">
        {{post.userId === person.id ? `author: ${person.name}` : null}}
      </span>
      <p v-if="!post.isFullText">{{`${post.body.substr(0, 100)}...`}}</p>
      <p v-if="post.isFullText">{{post.body}}</p>
      <button @click="switchPostTextLength(index)">
        {{post.isFullText ? 'Read less' : 'Read more'}}
      </button>
    </section>
    <Pagination />
  </div>
</template>

<script>
import { API_BASE_URL as API } from '@/const/assets';
import { mapGetters } from 'vuex';
import Pagination from './Pagination.vue';

export default {
  name: 'Posts',
  components: {
    Pagination,
  },

  data() {
    return {
    };
  },

  mounted() {
    this.$store.dispatch('getPosts');
    this.$store.dispatch('getAuthors');
  },

  computed: {
    ...mapGetters({
      posts: 'getPosts',
      authors: 'getAuthors',
      loading: 'getLoading',
      errored: 'getErrored',
    }),
  },

  methods: {
    async deletePostOfApi(id) {
      try {
        const res = await fetch(`${API}posts/${id}`, { method: 'DELETE' });

        if (!res.ok) throw new Error(`Error request, status: ${res.status}`);

        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },

    deletePost(index, postId) {
      this.posts.splice(index, 1);
      this.deletePostOfApi(postId);
    },

    switchPostTextLength(index) {
      if (!this.posts[index].isFullText) {
        this.$set(this.posts[index], 'isFullText', true);
      } else {
        this.$set(this.posts[index], 'isFullText', false);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
