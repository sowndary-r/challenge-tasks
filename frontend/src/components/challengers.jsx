import React, { useState } from 'react';
import '../css/challengers.css';
import axios from 'axios'
function AddChallengers() {
  const [names, setNames] = useState([{ id: 1, name: '' }]);
  const [message, setMessage] = useState('');
  const [apiMessage, setApiMessage] = useState('');

  const handleInputChange = (id, value, isEnter) => {
    if (isEnter) {
      setNames((prevNames) => [
        ...prevNames,
        { id: prevNames.length + 1, name: '' },
      ]);
    } else {
      setNames((prevNames) =>
        prevNames.map((n) => (n.id === id ? { ...n, name: value } : n))
      );
    }
  };

  const handleAddChallenger = () => {
    const lastChallenger = names[names.length - 1];
    if (lastChallenger.name.trim() !== '') {
      setNames((prevNames) => [
        ...prevNames,
        { id: prevNames.length + 1, name: '' },
      ]);
      setMessage('');
    } else {
      setMessage('Please enter a challenger\'s name');
    }
  };

  const handleRemoveChallenger = (id) => {
    setNames((prevNames) => prevNames.filter((n) => n.id !== id));
  };

  const handleSubmit = async () => {
    try {
    
      if(!(names.length===1 && !names[0].name)){
        const response = await axios.post('http://localhost:4000/api/v1/users', {
          challengers: names.map((n) => n.name),
        });
        console.log(response.data.message)
        setApiMessage(response.data.message);
      }

    } catch (error) {
      console.error('Error calling API:', error);
      setApiMessage('Unable to add challengers. please try again later.');
    }
  };

  return (
    <div className="container">
      <h4 className="heading">Add your Challengers!</h4>
      {names.map((n, index) => (
        <div key={n.id} className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={n.name}
            onChange={(e) => handleInputChange(n.id, e.target.value, false)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleInputChange(n.id, e.target.value, true);
              }
            }}
            placeholder={`Enter challenger's Name ${index + 1}`}
          />
          {index !== 0 && (
            <button
              className="btn btn-danger red-gradient-button"
              onClick={() => handleRemoveChallenger(n.id)}
            >
              -
            </button>
          )}
          {index === names.length - 1 && (
            <button
              className="btn btn-success green-gradient-button"
              onClick={handleAddChallenger}
            >
              +
            </button>
          )}
        </div>
      ))}
      {message && <div className="error-message">*{message}</div>}

      <div className="text-center">
        <div className="row justify-content-center my-3 px-3">
          <button onClick={handleSubmit} className="btn-block btn-color">
            <b>Save</b>
          </button>
          {apiMessage && <div className="api-message">{apiMessage}</div>}

        </div>
      </div>
      
    </div>
  );
}

export default AddChallengers;