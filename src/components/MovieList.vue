<template>
  <div class="movie-list">
    <div class="movie-list__filter-select-wrapper">
      <select :value="chosenFilter"
              @change="catchFilter">
        <option value="all">All</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
      </select>
    </div>
    <MovieListItem
      v-for="movie in movies"
      :key="movie.imdbID"
      :movie="movie"
      />
    <MovieLoadMoreBtn v-if="showLoadMoreBtn" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import MovieListItem from '@/components/MovieListItem.vue';
import MovieLoadMoreBtn from '@/components/LoadMoreBtn.vue';

export default Vue.extend({
  name: 'MovieList',
  components: {
    MovieListItem,
    MovieLoadMoreBtn,
  },
  computed: {
    ...mapState('MoviesStore', [
      'movies',
      'totalMovies',
      'chosenFilter',
    ]),
    showLoadMoreBtn(): boolean {
      return this.movies.length < this.totalMovies;
    },
  },
  methods: {
    ...mapActions('MoviesStore', ['getMovieList']),
    ...mapMutations('MoviesStore', [
      'setMoviesFilter',
      'clearMoviesList',
    ]),
    async catchFilter(e: any) {
      this.setMoviesFilter(e.target.value);
      this.clearMoviesList();
      await this.getMovieList();
    },
  },
  async created() {
    await this.getMovieList();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
