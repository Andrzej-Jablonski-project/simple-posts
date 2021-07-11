<template>
  <div class="container">
  <sdiv v-if="errored">
    <p>
      We're sorry, we're not able to retrieve this information at the moment, please try back later
    </p>
  </sdiv>
  <div v-else>
    <div v-if="loading">Loading...</div>
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
      <button @click="onFullText(index)">{{post.isFullText ? 'Read less' : 'Read more'}}</button>
    </section>
    <paginate
      v-model="page"
      :page-count="10"
      :click-handler="updatePage"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'">
    </paginate>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate';

const API = 'https://jsonplaceholder.typicode.com/';

export default {
  name: 'Posts',
  components: {
    Paginate,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      posts: [],
      authors: [],
      loading: true,
      errored: false,
      page: 1,
    };
  },

  mounted() {
    this.getPosts(this.page);
    this.getAuthors();
  },

  methods: {
    async getPosts(pageNumber) {
      try {
        const res = await fetch(`${API}posts?_page=${pageNumber}`, { method: 'GET' });

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

    async deletePostOnAPI(id) {
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
      this.deletePostOnAPI(postId);
    },

    onFullText(index) {
      if (!this.posts[index].isFullText) {
        this.$set(this.posts[index], 'isFullText', true);
      } else {
        this.$set(this.posts[index], 'isFullText', false);
      }
    },

    updatePage() {
      this.getPosts(this.page);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style: none;
}
</style>
