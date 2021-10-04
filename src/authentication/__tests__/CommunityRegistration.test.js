import { render, screen } from '@testing-library/react';
import CommunityRegistration from '../pages/CommunityRegistration';

test('check  Existing User? Sign In link', () => {
  render(<CommunityRegistration />);
  const linkElement = screen.getByText('Existing User? Sign In');
  expect(linkElement).toBeInTheDocument();
});