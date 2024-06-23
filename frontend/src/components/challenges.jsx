import React, { useState, useEffect } from 'react';
import { getAllChallengers, getAllChallenges } from '../middleware/api.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/challenges.css';
import AdminNavBar from './adminNavbar';

function Challenges() {
    const [users, setUsers] = useState([]);
    const [date, setDate] = useState(new Date());
    const [videos, setVideos] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllChallengers();
                setUsers(response.data.data[0]);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchLink = async () => {
            try {
                let querydate = date.toISOString().slice(0, 10);
                const response = await getAllChallenges(querydate);
                let videos = {};
                for (let user of users) {
                    videos[user.id] = '';
                }
                for (let data of response.data.data) {
                    videos[data.id] = data.video;
                }
                setVideos(videos);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };
        fetchLink();
    }, [date, users]);

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

    const extractVideoId = (url) => {
        if(url){
        const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
        }
        else{
            return ''
        }
    };

    return (
        <div className="challenges-container">
             <AdminNavBar />
            <h4 className='challengeTitle'>Welcome to 100 days 100 seconds challenge!!</h4>
            <div className="date-picker">
                <FontAwesomeIcon icon={faChevronLeft} onClick={handlePrevDay} />
                <div className="date-picker-container">
                    <DatePicker selected={date} onChange={handleDateChange} dateFormat="yyyy-MM-dd" maxDate={new Date()} />
                </div>
                <FontAwesomeIcon icon={faChevronRight} onClick={handleNextDay} />
            </div>
            <div className="users-grid">
                {users.map((user, index) => (
                    <div key={index} className="user-card">
                        <h4 className='userName'>{user.userName}</h4>
                        {videos[user.id] !== '' ? (
                            <div className="video-container">
                                <iframe
                                    title={`Video for ${user.userName}`}
                                    width="560"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${extractVideoId(videos[user.id])}`}
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <p className='no-video'>Videos not yet uploaded</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Challenges;
