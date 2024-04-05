import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './index';

describe('Button component', () => {
  test('renders children correctly', () => {
    render(<Button onClick={() => {}}>Test Button</Button>);
    expect(
      screen.getByRole('button', { name: /test button/i }),
    ).toBeInTheDocument();
  });

  test('handles onClick event', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    await user.click(screen.getByText(/click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies custom className', () => {
    render(
      <Button onClick={() => {}} className='custom-class'>
        Custom Class Button
      </Button>,
    );
    expect(
      screen.getByRole('button', { name: /custom class button/i }),
    ).toHaveClass('custom-class');
  });
});
