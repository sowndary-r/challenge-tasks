import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import Challenges from '../src/components/challenges';
import { getAllChallengers, getAllChallenges } from '../middleware/api';

jest.mock('../middleware/api');

describe('Challenges component', () => {
  beforeEach(() => {
    getAllChallengers.mockResolvedValue({
      data: { data: [{ id: 1, userName: 'User 1' }, { id: 2, userName: 'User 2' }] },
    });

    getAllChallenges.mockResolvedValue({
      data: { data: [{ id: 1, video: 'https://www.youtube.com/watch?v=video1' }] },
    });
  });

  test('renders the component', async () => {
    const { getByText } = render(<Challenges />);
    await waitFor(() => expect(getByText('Welcome to 100 days 100 seconds challenge!!')).toBeInTheDocument());
  });

  test('displays users and their videos', async () => {
    const { getByText, getByTitle } = render(<Challenges />);
    await waitFor(() => expect(getByText('User 1')).toBeInTheDocument());
    expect(getByTitle('Video for User 1')).toHaveAttribute('src', 'https://www.youtube.com/embed/video1');
  });

  test('changes date on clicking next/prev buttons', async () => {
    const { getByText, getByDisplayValue } = render(<Challenges />);
    fireEvent.click(getByText('❮'));
    await waitFor(() => expect(getByDisplayValue('yyyy-MM-dd')).toHaveValue(/* expected previous date */));
    fireEvent.click(getByText('❯'));
    await waitFor(() => expect(getByDisplayValue('yyyy-MM-dd')).toHaveValue(/* expected next date */));
  });
});
