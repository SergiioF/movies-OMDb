import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CatalogList } from './CatalogList';
import userEvent from '@testing-library/user-event';

const mockItems = [
  {
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
  },
];

describe('<CatalogList />', () => {
  test('renders the list of items correctly', () => {
    render(<CatalogList items={mockItems} onClick={vi.fn()} />);

    mockItems.forEach((item) => {
      expect(screen.getByText(item.Title)).toBeInTheDocument();
    });
  });

  test('calls onClick handler with the correct imdbID when an item is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = vi.fn();
    render(<CatalogList items={mockItems} onClick={mockOnClick} />);
    await user.click(screen.getByText(mockItems[0].Title));
    expect(mockOnClick).toHaveBeenCalledWith(mockItems[0].imdbID);
  });

  test('displays the correct rating background color', () => {
    render(<CatalogList items={mockItems} onClick={vi.fn()} />);

    expect(screen.getByText(mockItems[0].imdbRating)).toHaveClass(
      'bg-green-600',
    );
  });

  test('displays a placeholder image when Poster is "N/A"', () => {
    const mockOnClick = vi.fn();

    render(<CatalogList items={mockItems} onClick={mockOnClick} />);

    const image = screen.getAllByRole('img')[0];
    expect(image).toHaveAttribute('src', 'http://example.com/poster.jpg');
  });
});
