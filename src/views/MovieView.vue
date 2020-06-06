<template>
  <div class="movie-view">
    <h1>{{ movie.Title }}</h1>
    <div class="movie-view__details-wrapper">
      <div :style="posterStyle"
           class="movie-view__poster"></div>
      <div class="movie-view__details-cont">
        <table class="movie-view__table">
          <tr v-for="row in detailsTable"
              :key="row.label">
            <td class="movie-view__table-cell">{{ row.label }}</td>
            <td class="movie-view__table-cell">{{ row.value }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import { DetailTable } from '@/services/types';
import MovieService from '@/services/MovieService';

export default Vue.extend({
  name: 'MovieView',
  computed: {
    ...mapState('MoviesStore', ['movie']),
    posterStyle(): any {
      return { backgroundImage: `url(${this.movie.Poster})` };
    },
    detailsTable(): DetailTable[] {
      return [
        { label: 'Title:', value: this.movie.Title || '--' },
        { label: 'Type:', value: this.movie.Type || '--' },
        { label: 'Year:', value: this.movie.Year || '--' },
        { label: 'Rated:', value: this.movie.Rated || '--' },
        { label: 'Released:', value: this.movie.Released || '--' },
        { label: 'Production:', value: this.movie.Production || '--' },
        { label: 'Plot:', value: this.movie.Plot || '--' },
      ];
    },
  },
  methods: {
    ...mapActions('MoviesStore', ['getSpecificMovie']),
    ...mapMutations('MoviesStore', ['clearStore']),
  },
  async created() {
    this.getSpecificMovie(this.$route.params.movieId);
  },
  beforeDestroy() {
    this.clearStore();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie-view__details-wrapper {
  display: flex;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
.movie-view__poster {
  display: block;
  width: 200px;
  max-height: 400px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: contain;
}
.movie-view__details-cont {
  display: block;
  width: calc(100% - 200px);
}
.movie-view__table {
  text-align: left;
  table-layout: fixed;
}
.movie-view__table-cell:first-of-type {
  padding-right: 5px;
  font-weight: bold;
}
</style>
