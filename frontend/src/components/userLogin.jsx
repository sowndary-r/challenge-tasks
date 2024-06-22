import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/userLogin.css';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput
} from 'mdb-react-ui-kit';

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const authenticate = () => {

    const staticEmail = 'user@example.com';
    const staticPassword = 'password123';

    if (email === staticEmail && password === staticPassword) {
      navigate('/challengers'); // redirect to challengers page
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
        </MDBCol>
        <MDBCol col='4' md='6'>
          <MDBInput 
            wrapperClass='mb-4' 
            className="input-group" 
            placeholder='Email address' 
            id='formControlLg' 
            type='email' 
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MDBInput 
            wrapperClass='mb-4' 
            className="input-group" 
            placeholder='Password' 
            id='formControlLg' 
            type='password' 
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <MDBBtn onClick={authenticate} className="mb-4 w-100" size="lg">Login</MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default UserLogin;
