import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllChallengers } from '../middleware/api.js';
import '../styles/userLogin.css';
import HomeNavBar from './homeNavbar';
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

  const authenticate = async () => {

    const staticEmail = 'test@gmail.com';
    const staticPassword = '1234';

    if (email === staticEmail && password === staticPassword) {
      let response = await getAllChallengers();
      console.log( response.data.data[0])
      response.data.data[0].length ==0 ?  navigate('/challengers') : navigate('/upload-videos')
    } else {
      alert('Invalid email or password');
    }
  };

  return (
   
    <MDBContainer fluid className="p-3 my-5">
       <HomeNavBar />
    
       <MDBRow>
        
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
        </MDBCol>
        <MDBCol col='4' md='6' className='loginform'>
           <h3 className='heading'>Login here!!</h3>
          <input 
            wrapperClass='mb-4' 
            className="input-group" 
            placeholder='Email address' 
            id='formControl' 
            type='email' 
            size='lg'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            className="input-group" 
            placeholder='Password' 
            id='formControlLg' 
            type='password' 
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className = "submitbtn" onClick={authenticate} >Login</button>
    
        </MDBCol>
       
      </MDBRow>
    
    </MDBContainer>
   
  );
}

export default UserLogin;
