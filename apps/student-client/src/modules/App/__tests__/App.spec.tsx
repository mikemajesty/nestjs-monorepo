import * as React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('should verify img tag', async () => {
  render(<App />);
  const linkElement = await screen.findAllByAltText('logo');
  expect(linkElement[0]).toBeDefined()
});
