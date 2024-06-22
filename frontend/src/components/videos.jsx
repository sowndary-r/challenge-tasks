import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/videos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function UploadVideos() {
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);
    const [videos, setVideos] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/v1/users');
                console.log("list of all users ", response.data.data[0]);
                setUsers(response.data.data[0]);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };
    
    const handlePrevDay = () => {
        const prevDate = new Date(date);
        prevDate.setDate(date.getDate() - 1);
        setDate(prevDate);
    };
    
    const handleNextDay = () => {
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        setDate(nextDate);
    };

    const handleInputChange = (userId, value) => {
        setVideos(prevVideos => ({
            ...prevVideos,
            [userId]: value
        }));
    };

    const handleSubmit = async () => {
        const videoEntries = users
            .filter(user => videos[user.id]) // Filter out users without a video link
            .map(user => ({
                id: user.id,
                userName: user.userName,
                video: videos[user.id]
            }));
    
        if (videoEntries.length === 0) {
            alert('Please enter at least one video link');
            return;
        }
    
        const payload = {
            date: date.toISOString().slice(0, 10),
            videos: videoEntries
        };
    
        try {
            await axios.post('http://localhost:4000/api/v1/challenges', payload);
            alert('Videos uploaded successfully');
        } catch (error) {
            console.error('Error uploading videos:', error);
            alert('Failed to upload videos');
        }
    };
    
    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;  
        }
    };

    return (
        <div className="challenges-container">
             <h4 className="heading">Upload challenges!</h4>
            <div className="date-picker">
                <FontAwesomeIcon icon={faChevronLeft} onClick={handlePrevDay} />
                <div className="date-picker-container">
                    <DatePicker selected={date} onChange={handleDateChange} dateFormat="yyyy-MM-dd"  maxDate={new Date()}/>
                </div>
                <FontAwesomeIcon icon={faChevronRight} onClick={handleNextDay} />
            </div>
            <div className="users-list">
                {users.map(user => (
                    <div key={user.id} className="user-input">
                        <h3>{user.userName}</h3>
                        <input
                            type="text"
                            placeholder="Enter video link"
                            value={videos[user.id] || ''}
                            onChange={(e) => handleInputChange(user.id, e.target.value)}
                            className={!isValidUrl(videos[user.id]) && videos[user.id] ? 'invalid' : ''}
                        />
                        {!isValidUrl(videos[user.id]) && videos[user.id] && (
                            <p className="error-message">Not a valid link</p>
                        )}
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default UploadVideos;