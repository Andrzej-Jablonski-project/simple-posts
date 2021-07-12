<template>
  <div class="wrapper">
    <img class="logo" alt="Vue logo" width="200" height="200" src="../assets/logo.png">
    <h1 class="header">Simple blog</h1>
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
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;

  @media (min-width: 640px) {
  }
}

.logo {
  margin: 0 auto;
}

.header {
  text-align: center;
}
</style>
