import MovieService from '@/services/MovieService';
import { Movie, MovieDetail } from '../services/types';

export default {
  namespaced: true,
  state: {
    totalMovies: 0 as number,
    movies: [] as Movie[],
    movie: '',
  },
  actions: {
    async getMovieList(ctx: any, page = 1) {
      const result = await MovieService.getMovieList(ctx.rootState.user.apiToken, page);
      ctx.commit('setMoviesList', result.result);
      ctx.commit('setTotalMovies', +result.numberOfResult);
    },
    async getSpecificMovie(ctx: any, id: string) {
      const result = await MovieService.getSpecificMovie(ctx.rootState.user.apiToken, id);
      ctx.commit('setSpecificMovie', result);
    },
  },
  mutations: {
    setMoviesList(state: any, payload: Movie[]) {
      state.movies = [...state.movies, ...payload];
    },
    setTotalMovies(state: any, payload: number) {
      state.totalMovies = payload;
    },
    setSpecificMovie(state: any, payload: MovieDetail) {
      state.movie = payload;
    },
    clearStore(state: any) {
      state.totalMovies = 0;
      state.movies = [];
      state.movie = '';
    },
  },
};
