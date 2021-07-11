<template>
  <div class="container">
    <img class="logo" alt="Vue logo" width="200" height="200" src="../assets/logo.png">
    <h1>Simple blog</h1>
    <Posts />
  </div>
</template>

<script>
// @ is an alias to /src
import Posts from '@/components/Posts.vue';

export default {
  name: 'Home',
  components: {
    Posts,
  },
};
</script>

<style scoped lang="scss">

</style>
