import MovieService from '@/services/MovieService';
import { Movie, MovieDetail } from '../services/types';

export default {
  namespaced: true,
  state: {
    movies: [] as Movie[],
    movie: '',
  },
  actions: {
    async getAllMovies(ctx: any) {
      const result = await MovieService.getMovieList(ctx.rootState.user.apiToken);
      ctx.commit('setMoviesList', result.result);
    },
    async getSpecificMovie(ctx: any, id: string) {
      const result = await MovieService.getSpecificMovie(ctx.rootState.user.apiToken, id);
      ctx.commit('setSpecificMovie', result);
    },
  },
  mutations: {
    setMoviesList(state: any, payload: Array<Movie>) {
      state.movies = payload.sort((a: Movie, b: Movie) => +a.Year.split('–')[0] - +b.Year.split('–')[0]);
    },
    setSpecificMovie(state: any, payload: MovieDetail) {
      state.movie = payload;
    },
    clearStore(state: any) {
      state.movies = [];
      state.movie = '';
    },
  },
};
