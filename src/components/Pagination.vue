<template>
  <div class='container' v-if="!loading">
    <paginate
    v-model="page"
    :page-count="pageCount"
    :click-handler="updatePage"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'">
    </paginate>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate';
import { mapGetters } from 'vuex';

export default {
  name: 'Pagination',
  components: {
    Paginate,
  },

  mounted() {
    this.$store.dispatch('getAllPosts');
  },

  computed: {
    ...mapGetters({
      loading: 'getLoading',
      allPosts: 'getAllPosts',
    }),

    page: {
      get() {
        return this.$store.state.page;
      },

      set(value) {
        this.$store.commit('setPage', value);
      },
    },

    pageCount() {
      return Math.ceil(this.allPosts.length / 10);
    },
  },

  methods: {
    updatePage() {
      this.$store.dispatch('getPosts');
      this.$store.dispatch('getAuthors');
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
