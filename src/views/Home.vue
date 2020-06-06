<template>
  <div class="home">
    <img alt="Batman logo" src="~@/assets/logo.png" />
    <HelloWorld :msg="`Hello ${user.name}, which batman movie do you want to see?`"/>
    <MovieList />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue';
import MovieList from '@/components/MovieList.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    MovieList,
  },
  computed: {
    ...mapState(['user']),
  },
};
</script>
