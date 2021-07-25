import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll() {
    return this.movies;
  }

  getOne(id: number) {
    const movie = this.movies.find((item) => item.id === id);
    if (!movie) {
      throw new NotFoundException(`존재하지 않은 아이디 : ${id}`);
    }
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((item) => item.id !== +id);
  }

  create(data: CreateMovieDto) {
    return this.movies.push({
      id: this.movies.length + 1,
      ...data,
    });
  }

  update(id: number, data: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...data });
  }
}
