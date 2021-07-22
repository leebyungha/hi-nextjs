import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll() {
    return this.movies;
  }

  getOne(id: string) {
    return this.movies.find((item) => item.id === +id);
  }

  create(data) {
    return this.movies.push({
      id: this.movies.length + 1,
      ...data,
    });
  }
}
