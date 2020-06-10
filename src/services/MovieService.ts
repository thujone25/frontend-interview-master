import axios, { AxiosInstance } from 'axios';
import { MovieDetail } from '@/services/types';

class MovieService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://www.omdbapi.com/',
    });
  }

  public async getMovieList(params: object) {
    const result = await this.axiosInstance.get('/', {
      params: {
        s: 'Batman',
        ...params,
      },
    });

    return {
      result: result.data.Search,
      numberOfResult: result.data.totalResults,
    };
  }

  public async getSpecificMovie(token: string, id: string): Promise<MovieDetail> {
    const result = await this.axiosInstance.get('/', {
      params: {
        i: id,
        apikey: token,
      },
    });

    return result.data;
  }
}

export default new MovieService();
