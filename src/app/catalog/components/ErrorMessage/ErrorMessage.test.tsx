// ErrorMessage.test.tsx
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorMessage } from './ErrorMessage';

describe('<ErrorMessage />', () => {
  test('does not render when the message is empty', () => {
    render(<ErrorMessage message='' />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  test('displays the message when provided', () => {
    const testMessage = 'This is a test error message.';
    render(<ErrorMessage message={testMessage} />);
    expect(screen.getByRole('alert')).toHaveTextContent(testMessage);
  });
});
