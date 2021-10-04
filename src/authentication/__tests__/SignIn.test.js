import '@testing-library/jest-dom'

import * as React from 'react'
import {render,  screen} from '@testing-library/react'
import SignIn from '../pages/SignIn';

test('check New Community? Sign Up link', () => {
  render(<SignIn />);
  const linkElement = screen.getByText('New Community? Sign Up');
  expect(linkElement).toBeInTheDocument();
});