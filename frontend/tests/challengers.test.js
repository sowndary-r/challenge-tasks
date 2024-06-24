import React from 'react';
const axios = require('axios')
import { render, fireEvent, waitFor } from '@testing-library/react';
import AddChallengers from '../src/components/challengers';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('AddChallengers component', () => {
  beforeEach(() => {
    useNavigate.mockClear();
  });

  test('renders the component', async () => {
    const { getByText } = render(<AddChallengers />);
    await waitFor(() => expect(getByText('Enter the challengers!')).toBeInTheDocument());
  });

  test('adds a new challenger when clicking "+" button', () => {
    const { getByText, getByPlaceholderText } = render(<AddChallengers />);
    fireEvent.click(getByText('+'));
    expect(getByPlaceholderText('Enter challenger\'s Name 2')).toBeInTheDocument();
  });

  test('removes a challenger when clicking "-" button', () => {
    const { getByText, queryByPlaceholderText } = render(<AddChallengers />);
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('-'));
    expect(queryByPlaceholderText('Enter challenger\'s Name 2')).toBeNull();
  });

  test('submits the form and redirects to upload-videos page on success', async () => {
    const { getByText, getByPlaceholderText } = render(<AddChallengers />);
    fireEvent.change(getByPlaceholderText('Enter challenger\'s Name 1'), { target: { value: 'Test Challenger' } });
    fireEvent.click(getByText('+'));
    fireEvent.change(getByPlaceholderText('Enter challenger\'s Name 2'), { target: { value: 'Another Challenger' } });
    fireEvent.click(getByText('Save'));
    expect(useNavigate).toHaveBeenCalledWith('/upload-videos');
  });

  test('displays an error message when trying to submit with empty challenger name', async () => {
    const { getByText } = render(<AddChallengers />);
    fireEvent.click(getByText('Save'));
    expect(getByText('*Please enter a challenger\'s name')).toBeInTheDocument();
    
  });

  test('displays an error message when API call fails', async () => {
    const { getByText, getByPlaceholderText } = render(<AddChallengers />);
    fireEvent.change(getByPlaceholderText('Enter challenger\'s Name 1'), { target: { value: 'Test Challenger' } });
    fireEvent.click(getByText('+'));
    fireEvent.change(getByPlaceholderText('Enter challenger\'s Name 2'), { target: { value: 'Another Challenger' } });
    fireEvent.click(getByText('Save'));
    await waitFor(() => expect(mockAddChallengers).toHaveBeenCalledTimes(1));
    expect(getByText('Unable to add challengers. please try again later.')).toBeInTheDocument();
  });
});
