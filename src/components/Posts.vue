<template>
  <div class="posts">
  <section v-if="errored">
    <p>
      We're sorry, we're not able to retrieve this information at the moment, please try back later
    </p>
  </section>
  <section v-else>
    <div v-if="loading">Loading...</div>
  </section>
  <section v-for="(post, index) in posts" :key="post.id">
      <h2 >title: {{post.title}}
        <button @click="removePost(index)">Remove</button>
      </h2>
      <span v-for="person in authors" :key="person.id">
        {{post.userId === person.id ? `author: ${person.name}` : null}}
      </span>
      <p v-if="!post.isFullText">{{`${post.body.substr(0, 100)}...`}}</p>
      <p v-if="post.isFullText">{{post.body}}</p>
      <button @click="onFullText(index)">{{post.isFullText ? 'Read less' : 'Read more'}}</button>
    </section>
  </div>
</template>

<script>
const API = 'https://jsonplaceholder.typicode.com/';

export default {
  name: 'Posts',
  props: {
    msg: String,
  },
  data() {
    return {
      posts: [],
      authors: [],
      loading: true,
      errored: false,
    };
  },

  mounted() {
    this.getPosts();
    this.getAuthors();
  },

  methods: {
    async getPosts() {
      try {
        const res = await fetch(`${API}posts`, { method: 'GET' });

        if (!res.ok) throw new Error(`Error request, status: ${res.status}`);

        const data = await res.json();
        this.posts = data;
      } catch (error) {
        console.log(error);
        this.errored = true;
      } finally {
        this.loading = false;
      }
    },

    async getAuthors() {
      try {
        const res = await fetch(`${API}users`, { method: 'GET' });

        if (!res.ok) throw new Error(`Error request, status: ${res.status}`);

        const data = await res.json();
        this.authors = data;
      } catch (error) {
        console.log(error);
      }
    },

    removePost(index) {
      this.posts.splice(index, 1);
    },

    onFullText(index) {
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
