<template>
  <div class="movie-view">
    <h1>This is the movie view</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import MovieService from '@/services/MovieService';

export default Vue.extend({
  name: 'MovieView',
  methods: {
    ...mapActions('MoviesStore', ['getSpecificMovie']),
  },
  async created() {
    this.getSpecificMovie('tt0372784');
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
