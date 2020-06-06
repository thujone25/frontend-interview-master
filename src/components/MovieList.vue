<template>
  <div class="hello">
    <MovieListItem
      v-for="movie in movies"
      :key="movie.imdbID"
      :movie="movie"
      />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import MovieListItem from '@/components/MovieListItem.vue';

export default Vue.extend({
  name: 'MovieList',
  components: {
    MovieListItem,
  },
  computed: {
    ...mapState('MoviesStore', ['movies']),
  },
  methods: {
    ...mapActions('MoviesStore', ['getAllMovies']),
  },
  async created() {
    await this.getAllMovies();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
