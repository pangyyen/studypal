import React from 'react';
import { render, screen } from '@testing-library/react';
import Social from '../Social';

jest.mock('../../authentication/auth-context', () => ({
  useAuth: () => ({
    currentUser: {
      // Mock the currentUser object if needed
      displayName:"test04 display",
      email:"test04@gmail.com",
      fullName:"full",
      major:"cs",
      modules:["MA2001", "HSI1000"],
      teleName:"test04 tele",
      uid:"0OUyOP0g5COtz1ajsLAT7DKUWVH3",
      year:"4"
    },
  }),
}));

describe('Social', () => {
  it('renders the component without errors', () => {
    render(<Social />);
    // Assert that the component renders without throwing an error
  });

  it('displays the correct title and subtitle', () => {
    render(<Social />);
    const titleElement = screen.getByText('SOCIAL');
    const subtitleElement = screen.getByText('List of Contacts for Future Reference');
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });

  it('displays the contact columns', () => {
    render(<Social />);
    const idColumn = screen.getByText('ID');
    const nameColumn = screen.getByText('Name');
    const telegramUsernameColumn = screen.getByText('Telegram Usernsme');
    const emailColumn = screen.getByText('Email');
    const majorColumn = screen.getByText('Major');
    expect(idColumn).toBeInTheDocument();
    expect(nameColumn).toBeInTheDocument();
    expect(telegramUsernameColumn).toBeInTheDocument();
    expect(emailColumn).toBeInTheDocument();
    expect(majorColumn).toBeInTheDocument();
  });

});