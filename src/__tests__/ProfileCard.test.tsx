import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProfileCard } from '../components/profile-card/ProfileCard';
import type { Profile } from '@/types';

describe('ProfileCard Component', () => {
  const mockProfile: Profile = {
    id: '1',
    name: 'Ivan Petrechenko',
    age: 30,
    email: 'ioann@gmail.com',
    gender: 'male',
    country: 'Belarus',
    avatarUrl: 'https://example.com/avatar.jpg',
  };

  it('renders profile information correctly', () => {
    render(<ProfileCard profile={mockProfile} />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Ivan Petrechenko',
    );

    expect(screen.getByText(/30/i)).toBeInTheDocument();
    expect(screen.getByText(/male/i)).toBeInTheDocument();
    expect(screen.getByText(/Belarus/i)).toBeInTheDocument();
    expect(screen.getByText('ioann@gmail.com')).toBeInTheDocument();
  });

  it('renders avatar with correct attributes', () => {
    render(<ProfileCard profile={mockProfile} />);

    const avatar = screen.getByRole('img', {
      name: /Ivan Petrechenko's avatar/i,
    });
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', mockProfile.avatarUrl);
  });
});
