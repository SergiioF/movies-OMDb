import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from './SearchBar';
import userEvent from '@testing-library/user-event';

describe('<SearchBar />', () => {
  test('updates input value when typing', async () => {
    const mockOnSearch = vi.fn();
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} defaultValue={null} />);
    const input = screen.getByPlaceholderText('Buscar por título...');
    await user.type(input, 'Matrix');
    expect(input).toHaveValue('Matrix');
  });

  test('calls onSearch prop function when enter is pressed', async () => {
    const mockOnSearch = vi.fn();
    const user = userEvent.setup();
    render(<SearchBar onSearch={mockOnSearch} defaultValue='Matrix' />);
    const input = screen.getByPlaceholderText('Buscar por título...');
    await user.click(input);
    await user.keyboard('{Enter}');
    expect(mockOnSearch).toHaveBeenCalledWith('Matrix');
  });

  test('calls onSearch prop function when search button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} defaultValue='Matrix' />);
    const button = screen.getByRole('button', { name: /buscar/i });
    await user.click(button);
    expect(mockOnSearch).toHaveBeenCalledWith('Matrix');
  });
});
