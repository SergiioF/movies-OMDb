import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { useGetCatalog } from './useGetCatalog';
import { getCatalog, getDataById } from '../../services';

vi.mock('../../services', () => ({
  getCatalog: vi.fn(),
  getDataById: vi.fn(),
}));

const mockCatalog = {
  Actors: 'Actor 1, Actor 2, Actor 3',
  Awards: 'Nominated for 2 Oscars. Another 3 wins & 30 nominations.',
  Country: 'USA',
  Director: 'Director Name',
  Genre: 'Drama, Thriller',
  Language: 'English',
  Plot: "This is a brief description of the movie's plot.",
  Poster: 'http://example.com/poster.jpg',
  Rated: 'PG-13',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '8.5/10' },
    { Source: 'Rotten Tomatoes', Value: '94%' },
    { Source: 'Metacritic', Value: '74/100' },
  ],
  Released: '10 Jun 1999',
  Runtime: '142 min',
  Title: 'Example Movie Title',
  Type: 'movie',
  Writer: 'Writer Name',
  Year: '1999',
  imdbID: 'tt1234567',
  imdbRating: '8.5',
};

describe('useGetCatalog', () => {
  test('initializes with default state', () => {
    const { result } = renderHook(() => useGetCatalog());
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBe('');
  });

  test('sets loading to true when searchCatalog is called', async () => {
    const { result } = renderHook(() => useGetCatalog());
    act(() => {
      result.current.searchCatalog({ title: 'Matrix' });
    });
    await waitFor(() => expect(result.current.loading).toBeTruthy());
    await waitFor(() => expect(result.current.loading).toBeFalsy());
  });

  test('sets data on successful searchCatalog call', async () => {
    vi.mocked(getCatalog).mockResolvedValue([
      {
        imdbID: 'tt0111161',
        Poster: 'url',
        Title: 'Some title',
        Type: 'movie',
        Year: '2006',
      },
    ]);
    vi.mocked(getDataById).mockResolvedValue(mockCatalog);

    const { result } = renderHook(() => useGetCatalog());
    act(() => {
      result.current.searchCatalog({ title: 'The Shawshank Redemption' });
    });
    await waitFor(() => expect(result.current.data).toEqual([mockCatalog]));

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBe('');

    vi.resetAllMocks();
  });

  test('sets error on failed searchCatalog call', async () => {
    vi.mocked(getCatalog).mockRejectedValue(new Error('Movie not found'));

    const { result } = renderHook(() => useGetCatalog());
    act(() => {
      result.current.searchCatalog({ title: 'Nonexistent Movie' });
    });

    await waitFor(() =>
      expect(result.current.error).toBe('No se encontraron peliculas.'),
    );
    await waitFor(() => expect(result.current.loading).toBeFalsy());
    vi.resetAllMocks();
  });
});
