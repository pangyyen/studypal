import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'; // Import the Router component
import App from './App'; // Assuming this is the App component
import Login from './scenes/authentication/login'; // Assuming this is the Login component
import '@testing-library/jest-dom/extend-expect'; // Import the matchers
  
test('login page title testing having the introduction text', async () => {
  // ARRANGE
  render(
    <Router> {/* Wrap your component with the Router */}
      <Login />
    </Router>
  );

  //expect login-header to have text content
  expect(screen.getByTestId('header-title')).toHaveTextContent('LOGIN');
  expect(screen.getByTestId('header-subtitle')).toHaveTextContent('Start seeking for studypal now!');

})

  
test('login page title testing having the introduction text', async () => {
  // ARRANGE
  render(
    <Router> {/* Wrap your component with the Router */}
      <Login />
    </Router>
  );

  //expect login-header to have text content
  expect(screen.getByTestId('header-title')).toHaveTextContent('LOGIN');
  expect(screen.getByTestId('header-subtitle')).toHaveTextContent('Start seeking for studypal now!');


})
// test('login page test', async () => {
//   // ARRANGE
//   render(<Login />);
//   const emailInput = screen.getByTestId('login-form-email');
//   // const passwordInput = screen.getByLabelText(/password/i);
//   // const submitButton = screen.getByRole('button', { name: /submit/i });

//   // ACT
//   userEvent.type(emailInput, 'test@email.com');
//   // userEvent.type(passwordInput, 'chucknorris');
//   // userEvent.click(submitButton);

//   // ASSERT
//   // expect(await screen.findByText(/you're logged in/i)).toBeInTheDocument();
//   expect(emailInput).toHaveValue('test@email.com');
//   // expect(passwordInput).toHaveValue('');
  


//   // // ACT
//   // await userEvent.click(screen.getByText('Load Greeting'))
//   // await screen.findByRole('heading')

//   // // ASSERT
//   // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//   // expect(screen.getByRole('button')).toBeDisabled()
// })