export default {
  methods: {
    updatePage() {
      const viewNumberPosts = 10;
      const posts = ([...this.allPosts].splice(Number(`${this.page - 1}0`), viewNumberPosts));
      this.$store.commit('setPosts', posts);
    },
  },
};
