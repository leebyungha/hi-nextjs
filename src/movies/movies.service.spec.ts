import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const movies = service.getAll();
      expect(movies).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2021,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
    });

    it('should throw NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('should delete a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2021,
      });
      const before = service.getAll().length;
      service.deleteOne(1);
      const after = service.getAll().length;
      expect(after).toBeLessThan(before);
    });

    it('should throw NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeMovies = service.getAll().length;
      service.create({
        title: 'Test Movie',
        year: 2021,
      });
      const afterMovies = service.getAll().length;
      expect(afterMovies).toBeGreaterThan(beforeMovies);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2021,
      });
      service.update(1, { title: 'Updated Movie' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Movie');
    });
    it('should throw NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
