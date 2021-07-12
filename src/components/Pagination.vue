<template>
  <div class='container' v-if="!loading">
    <paginate
    v-model="page"
    :page-count="pageCount"
    :click-handler="updatePage"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'"
    :prev-class="'prev-item'"
    :next-class="'next-item'"
    :active-class="'active'"
    :disabled-class="'disable'"
    :margin-pages="1">
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
<style lang="scss">
.pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style: none;
  padding: 0;
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -.52px;
}

.page-item, .prev-item, .next-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border: 2px solid #c4c4c4;
  font-size: 16px;
  padding: 4px;

  @media (min-width: 360px) {
    padding: 8px;
  }
}

.page-item {
  border-left: none;
}

.next-item {
  width: 80px;
  border-left: none;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.prev-item {
  width: 80px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.disable {
  color: #c4c4c4;
}

.active {
  color: #c4c4c4;
  background: #34394f;
  border-right: 2px solid #c4c4c4;
}

</style>
