import MovieService from '@/services/MovieService';
import { Movie, MovieDetail } from '../services/types';

export default {
  namespaced: true,
  state: {
    chosenFilter: 'all' as string,
    totalMovies: 0 as number,
    currentPage: 1 as number,
    progressActive: false as boolean,
    movies: [] as Movie[],
    movie: {} as MovieDetail,
  },
  actions: {
    async getMovieList(ctx: any) {
      const params = {
        page: ctx.state.currentPage,
        apikey: ctx.rootState.user.apiToken,
        type: '',
      };
      if (ctx.state.chosenFilter !== 'all') params.type = ctx.state.chosenFilter;
      ctx.commit('setMoviesProgress', true);
      const result = await MovieService.getMovieList(params);
      ctx.commit('setMoviesList', result.result);
      ctx.commit('setTotalMovies', +result.numberOfResult);
      ctx.commit('setMoviesProgress', false);
    },
    async getSpecificMovie(ctx: any, id: string) {
      const result = await MovieService.getSpecificMovie(ctx.rootState.user.apiToken, id);
      ctx.commit('setSpecificMovie', result);
    },
  },
  mutations: {
    setMoviesProgress(state: any, payload: boolean) {
      state.progressActive = payload;
    },
    clearMoviesList(state: any) {
      state.movies = [];
    },
    setMoviesList(state: any, payload: Movie[]) {
      state.movies = [...state.movies, ...payload];
    },
    setTotalMovies(state: any, payload: number) {
      state.totalMovies = payload;
    },
    setMoviesCurrentPage(state: any, payload: number) {
      state.currentPage = payload;
    },
    setMoviesFilter(state: any, payload: string) {
      state.chosenFilter = payload;
    },
    setSpecificMovie(state: any, payload: MovieDetail) {
      state.movie = payload;
    },
    clearStore(state: any) {
      state.chosenFilter = 'all';
      state.totalMovies = 0;
      state.movies = [];
      state.movie = {};
    },
  },
};
