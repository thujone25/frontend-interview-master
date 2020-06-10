<template>
  <div class="load-more-btn__wrapper">
    <button :disabled="progressActive"
            class="load-more-btn__btn js-unit__load-more-btn"
            @click="loadMoreMovies">Load more</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState, mapMutations } from 'vuex';

export default Vue.extend({
  name: 'MovieListLoadMoreBtn',
  computed: {
    ...mapState('MoviesStore', [
      'currentPage',
      'progressActive',
    ]),
  },
  methods: {
    ...mapActions('MoviesStore', ['getMovieList']),
    ...mapMutations('MoviesStore', [
      'setMoviesCurrentPage',
    ]),
    async loadMoreMovies() {
      this.setMoviesCurrentPage(this.currentPage + 1);
      await this.getMovieList();
    },
  },
});
</script>
