import { render, screen } from '@testing-library/react';
import App from './Game';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/drag the image/i);
  expect(linkElement).toBeInTheDocument();
});
