import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Filter } from '..';
import userEvent from '@testing-library/user-event';

describe('<Filter />', () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ];

  test('renders the filter label', () => {
    render(<Filter label='Test Label' options={[]} onChange={vi.fn()} />);
    expect(screen.getByText(/test label/i)).toBeInTheDocument();
  });

  test('renders all options', () => {
    const mockFilter = vi.fn();
    render(
      <Filter label='Test Label' options={options} onChange={mockFilter} />,
    );
    options.forEach((option) => {
      expect(
        screen.getByRole('option', { name: option.label }),
      ).toBeInTheDocument();
    });
  });

  test('calls onChange prop when an option is selected', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Filter label='Test Label' options={options} onChange={handleChange} />,
    );
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, options[1].value);
    expect(handleChange).toHaveBeenCalledWith(options[1].value);
  });
});
