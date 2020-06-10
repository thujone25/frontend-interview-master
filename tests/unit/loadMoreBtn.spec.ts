import { shallowMount, createLocalVue, } from '@vue/test-utils';
import Vuex, {mapGetters, mapState, mapMutations} from 'vuex';
import Component from '@/components/LoadMoreBtn.vue';
import MoviesStore from '@/store/MoviesStore.ts'

const localVue = createLocalVue();

localVue.use(Vuex);

describe('components/LoadMoreBtn.vue', () => {
  let getMovieList = '' as any;
  let wrapper = {} as any;
  beforeEach(() => {
    getMovieList = jest.fn().mockImplementation(() => Promise.resolve());
    MoviesStore.actions.getMovieList = getMovieList;
    const store = new Vuex.Store({
      modules: {
        MoviesStore
      }
    });
    wrapper = shallowMount(Component, {
      store,
      localVue
    });
    wrapper.vm.$store.commit('MoviesStore/setMoviesCurrentPage', 1);
  });

  it('re-fetches movies', () => {
    wrapper.find('.js-unit__load-more-btn').trigger('click');
    expect(getMovieList.mock.calls.length).toBe(1);
    wrapper.find('.js-unit__load-more-btn').trigger('click');
    expect(getMovieList.mock.calls.length).toBe(2);
  });

  it('increments the current page by click', () => {
    expect(wrapper.vm.$store.state.MoviesStore.currentPage).toBe(1);
    wrapper.find('.js-unit__load-more-btn').trigger('click');
    expect(wrapper.vm.$store.state.MoviesStore.currentPage).toBe(2);
    wrapper.find('.js-unit__load-more-btn').trigger('click');
    expect(wrapper.vm.$store.state.MoviesStore.currentPage).toBe(3);
  });
});
