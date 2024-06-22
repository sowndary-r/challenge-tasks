import React, { useState, useEffect } from 'react';
import {getAllChallengers, getAllChallenges} from '../api/challengeAPI.js'
import YouTube from "react-youtube";
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../css/challenges.css';

function Challenges() {
    const [users, setUsers] = useState([]);
    const [link, setLink] = useState([]);
    const [date, setDate] = useState(new Date()); // Initialize with today's date
    const [videoSet, setHashMap] = useState({});
    const [videos, setVideos] = useState({});

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let mapVideos = {};
                const response = await getAllChallengers();
                console.log("response ",response)
                for (let user of response.data.data[0]) {
                    mapVideos[user.id] = '';
                }
                setUsers(response.data.data[0]);
                setHashMap(mapVideos)
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

                // Initialize videos object with empty strings for all users
                let videos = {};
                for (let user of users) {
                    videos[user.id] = '';
                }
                for (let data of response.data.data) {
                    videos[data.id] = data.video;
                }
                console.log("videos ", videos)
                setVideos(videos);
            } catch (error) {
                console.error('Error fetching users:', error);
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

    return (
        <div className="challenges-container">
             <h4 className="heading">Here is all the challenges!</h4>
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
                        <h3>{user.userName}</h3>
                        {videos[user.id] !== '' ? (
                            <div className="video-container">
                                <iframe
                                    title={`Video for ${user.userName}`}
                                    width="80%"
                                    height="80%"
                                    src={videos[user.id]}
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <p>No video available</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
    
}

export default Challenges;
