<template>
  <div class="container-posts">
    <div v-if="errored">
      <p>
        We're sorry, we're not able to retrieve this information at the moment,
        please try back later
      </p>
    </div>
    <div v-else>
      <div class="loading" v-if="loading">Loading...</div>
    </div>
    <article class="article" v-for="(post, index) in posts" :key="post.id">
      <h2 class="header-title">{{post.title}}</h2>
      <div class="wrapper-author">
        <span class="author" v-for="author in authors" :key="author.id">
          {{post.userId === author.id ? author.name : null}}
        </span>
      </div>
      <p class="post-body" v-if="!post.isFullText">{{`${post.body.substr(0, 100)}...`}}</p>
      <p class="post-body" v-if="post.isFullText">{{post.body}}</p>
      <div class="wrapper-btn">
        <button class="btn-more" @click="switchPostTextLength(index)">
        {{post.isFullText ? 'Read less' : 'Read more'}}
        </button>
        <button class="btn-delete" @click="deletePost(post.id)">Delete</button>
      </div>
    </article>
    <Pagination />
  </div>
</template>

<script>
import { API_BASE_URL as API } from '@/const/assets';
import { mapGetters } from 'vuex';
import mixin from '@/mixins/updatePage';
import Pagination from './Pagination.vue';

export default {
  name: 'Posts',
  mixins: [mixin],
  components: {
    Pagination,
  },

  data() {
    return {
    };
  },

  mounted() {
    this.$store.dispatch('getAuthors');
    this.$store.dispatch('getAllPosts');
  },

  computed: {
    ...mapGetters({
      allPosts: 'getAllPosts',
      posts: 'getPosts',
      authors: 'getAuthors',
      loading: 'getLoading',
      errored: 'getErrored',
      page: 'getPage',
    }),
  },

  methods: {
    async deletePostOfApi(id) {
      try {
        const res = await fetch(`${API}posts/${id}`, { method: 'DELETE' });

        if (!res.ok) throw new Error(`Error request, status: ${res.status}`);
      } catch (error) {
        console.log(error);
      }
    },

    deletePost(postId) {
      const newAllPosts = this.allPosts.filter((post) => post.id !== postId);
      this.$store.commit('setAllPosts', newAllPosts);
      this.updatePage();
      if (this.posts.length === 0) {
        this.$store.commit('setPage', this.page - 1);
        this.updatePage();
      }
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
.container-posts {
  @media (min-width: 680px) {
    width: 640px;
    margin: 0 auto;
  }
}

.wrapper-author {
  color: #c4c4c4;
  border-bottom: 2px solid #c4c4c4;
}

.loading {
  text-align: center;
}

.post-body {
  font-size: 1.2rem;
  margin-bottom: 28px;
}

.wrapper-btn {
  display: flex;
  justify-content: space-between;
  margin: 0 8px 52px;
}

.btn-more, .btn-delete {
  width: 46%;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -.52px;
  text-align: center;
  cursor: pointer;
  border-radius: 6px;
  border: none;
  color: #fff;
  background-color: #34394f;

  &:focus {
    outline: none;
    border-radius: 6px;
    border: solid 2px #c4c4c4;
  }

  @media (min-width: 360px) {
    width: 40%;
  }

  @media (min-width: 540px) {
    width: 25%;
  }

  @media (min-width: 640px) {
    width: 25%;
  }
}
</style>
