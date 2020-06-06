<template>
  <div class="hello">
    <p>
      <router-link :to="movieLink"
                   class="hello">
        {{ movie.Title }} | {{ movie.Year }}
      </router-link>
    </p>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import { Movie } from '@/services/types';

export default Vue.extend({
  name: 'MovieListItem',
  props: {
    movie: {
      type: Object,
    } as PropOptions<Movie>,
  },
  computed: {
    movieLink(): any {
      return { name: 'MovieView', params: { movieId: this.movie.imdbID } };
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
