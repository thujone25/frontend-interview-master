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
    <div v-if="showLoadMoreBtn"
         class="movie-list__more-btn-wrapper">
      <button :disabled="progressActive"
              class="movie-list__more-btn"
              @click="loadMoreMovies">Load more</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import MovieListItem from '@/components/MovieListItem.vue';

export default Vue.extend({
  name: 'MovieList',
  components: {
    MovieListItem,
  },
  computed: {
    ...mapState('MoviesStore', [
      'movies',
      'totalMovies',
      'chosenFilter',
      'currentPage',
      'progressActive',
    ]),
    showLoadMoreBtn(): boolean {
      return this.movies.length < this.totalMovies;
    },
  },
  methods: {
    ...mapActions('MoviesStore', ['getMovieList']),
    ...mapMutations('MoviesStore', [
      'setMoviesFilter',
      'setMoviesCurrentPage',
      'clearMoviesList',
    ]),
    async loadMoreMovies() {
      this.setMoviesCurrentPage(this.currentPage += 1);
      await this.getMovieList();
    },
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
