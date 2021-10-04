import '@testing-library/jest-dom'

import * as React from 'react'
import {render,  screen} from '@testing-library/react'

import Registration from '../pages/Registration';

test('check  Existing User? Sign In link', () => {
  render(<Registration />);
  const linkElement = screen.getByText('Existing User? Sign In');
  expect(linkElement).toBeInTheDocument();
});