import {useSelector,useDispatch} from 'react-redux'; 
import {sessionLogin}from '../features/session_reducer';
import React, { useState } from 'react';
import {tokenlogin} from '../features/token_reducer';
import {jwtLogin} from '../features/jwt_reducer';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from '@react-oauth/google';
import {responseGoogle} from '../features/google_functions'

function LoginForm(props){

    const [username,setUsername] = useState('');
    const [password,setpassword] = useState('');
    const csrf = useSelector((state)=>state.session.csrf);
    const dispatch = useDispatch();
    const responseFacebook = (response) => {
        console.log(response);
    }
    
    return (<div className="loginform">
                <forum>
                    <input value={username} onChange={(e)=> setUsername(e.target.value)} className='form-input' placeholder="Enter Username" type="text" />
                    <input value={password} onChange={(e)=> setpassword(e.target.value)} className='form-input' placeholder="Enter password" type="password" />
                    <button onClick={() => dispatch(sessionLogin(username,password,csrf)) }>Login using session</button>
                    <button onClick={() => dispatch(tokenlogin(username,password)) }>Login using Token</button>
                    <button onClick={() => dispatch(jwtLogin(username,password)) }>Login using JwtToken</button>
                    <FacebookLogin
                    appId="3115028565479004"
                    fields="name,email"
                    callback={responseFacebook} />
                    <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        responseGoogle(dispatch,credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    />
                </forum>
            </div>);

}

export default LoginForm;