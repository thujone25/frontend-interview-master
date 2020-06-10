<template>
  <div class="movie-list">
    <MovieListItem
      v-for="movie in movies"
      :key="movie.imdbID"
      :movie="movie"
      />
    <div v-if="showLoadMoreBtn"
         class="movie-list__more-btn-wrapper">
      <button :disabled="loadProgress"
              class="movie-list__more-btn"
              @click="loadMoreMovies">Load more</button>
    </div>
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
  data() {
    return {
      currentPage: 1,
      loadProgress: false,
    };
  },
  computed: {
    ...mapState('MoviesStore', ['movies', 'totalMovies']),
    showLoadMoreBtn(): boolean {
      return this.movies.length < this.totalMovies;
    },
  },
  methods: {
    ...mapActions('MoviesStore', ['getMovieList']),
    async loadMoreMovies() {
      this.loadProgress = true;
      this.currentPage += 1;
      await this.getMovieList(this.currentPage);
      this.loadProgress = false;
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
