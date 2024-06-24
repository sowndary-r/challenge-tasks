import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UploadVideos from '../src/components/videos';
import { getAllChallengers, uploadChallenges } from '../middleware/api';

jest.mock('../middleware/api');

describe('UploadVideos component', () => {
  test('renders the component', async () => {
    const { getByText } = render(<UploadVideos />);
    expect(getByText('Upload challenge videos!')).toBeInTheDocument();
  });

  test('renders user inputs for each user', async () => {
    const users = [
      { id: 1, userName: 'User 1' },
      { id: 2, userName: 'User 2' },
    ];
    getAllChallengers.mockResolvedValueOnce({ data: { data: [users] } });
    const { getByText, getAllByPlaceholderText } = render(<UploadVideos />);
    expect(getByText('User 1')).toBeInTheDocument();
    expect(getByText('User 2')).toBeInTheDocument();
    expect(getAllByPlaceholderText('Enter video link')).toHaveLength(2);
  });

  test('submits videos successfully', async () => {
    const users = [
      { id: 1, userName: 'User 1' },
      { id: 2, userName: 'User 2' },
    ];
    getAllChallengers.mockResolvedValueOnce({ data: { data: [users] } });
    uploadChallenges.mockResolvedValueOnce();
    const { getByText, getByPlaceholderText } = render(<UploadVideos />);
    fireEvent.change(getByPlaceholderText('Enter video link'), { target: { value: 'https://www.youtube.com/example' } });
    fireEvent.click(getByText('Submit'));
    await waitFor(() => expect(uploadChallenges).toHaveBeenCalledTimes(1));
    expect(uploadChallenges).toHaveBeenCalledWith({
      date: expect.any(String),
      videos: [
        { id: 1, userName: 'User 1', video: 'https://www.youtube.com/example' },
        { id: 2, userName: 'User 2', video: 'https://www.youtube.com/example' },
      ],
    });
    expect(alert).toHaveBeenCalledWith('Videos uploaded successfully');
  });

  test('displays error message when trying to submit without video links', async () => {
    const users = [
      { id: 1, userName: 'User 1' },
      { id: 2, userName: 'User 2' },
    ];
    getAllChallengers.mockResolvedValueOnce({ data: { data: [users] } });
    const { getByText } = render(<UploadVideos />);
    fireEvent.click(getByText('Submit'));
    await waitFor(() => expect(alert).toHaveBeenCalledWith('Please enter at least one video link'));
    expect(uploadChallenges).not.toHaveBeenCalled();
  });

  test('displays error message for invalid video links', async () => {
    const users = [
      { id: 1, userName: 'User 1' },
      { id: 2, userName: 'User 2' },
    ];
    getAllChallengers.mockResolvedValueOnce({ data: { data: [users] } });
    const { getByText, getByPlaceholderText } = render(<UploadVideos />);
    fireEvent.change(getByPlaceholderText('Enter video link'), { target: { value: 'invalid-url' } });
    fireEvent.click(getByText('Submit'));
    await waitFor(() => expect(alert).toHaveBeenCalledWith('Failed to upload videos'));
    expect(uploadChallenges).not.toHaveBeenCalled();
  });
});
