import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UserLogin from '../src/components/userLogin';
import { getAllChallengers } from '../middleware/api';

jest.mock('../middleware/api');

describe('UserLogin component', () => {
  test('renders the component', async () => {
    const { getByText } = render(<UserLogin />);
    expect(getByText('Login here!!')).toBeInTheDocument();
  });

  test('logs in with correct credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<UserLogin />);
    fireEvent.change(getByPlaceholderText('Email address'), { target: { value: 'test@gmail.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: '1234' } });
    fireEvent.click(getByText('Login'));
    await waitFor(() => expect(getByText('Upload Videos')).toBeInTheDocument());
  });

  test('displays error message with incorrect credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<UserLogin />);
    fireEvent.change(getByPlaceholderText('Email address'), { target: { value: 'invalid@gmail.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'invalid' } });
    fireEvent.click(getByText('Login'));
    await waitFor(() => expect(getByText('Invalid email or password')).toBeInTheDocument());
  });

  test('navigates to "/challengers" if no challengers are present', async () => {
    getAllChallengers.mockResolvedValueOnce({ data: { data: [] } });
    const { getByPlaceholderText, getByText } = render(<UserLogin />);
    fireEvent.change(getByPlaceholderText('Email address'), { target: { value: 'test@gmail.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: '1234' } });
    fireEvent.click(getByText('Login'));
    await waitFor(() => expect(getByText('Challengers')).toBeInTheDocument());
  });

  test('navigates to "/upload-videos" if challengers are present', async () => {
    getAllChallengers.mockResolvedValueOnce({ data: { data: [{ id: 1, name: 'Challenger 1' }] } });
    const { getByPlaceholderText, getByText } = render(<UserLogin />);
    fireEvent.change(getByPlaceholderText('Email address'), { target: { value: 'test@gmail.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: '1234' } });
    fireEvent.click(getByText('Login'));
    await waitFor(() => expect(getByText('Upload Videos')).toBeInTheDocument());
  });
});
