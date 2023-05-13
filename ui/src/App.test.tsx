import { render, screen } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';

vi.mock('./api/ForeCast.api');

describe('App', () => {
  test('renders date and time pickers', () => {
    render(<App />);

    const datePicker = screen.getByPlaceholderText('MM/DD/YYYY');
    const timePicker = screen.getByPlaceholderText('hh:mm:ss:aa');

    expect(datePicker).toBeInTheDocument();
    expect(timePicker).toBeInTheDocument();
  });
});
