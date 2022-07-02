import React, { useEffect, useState } from 'react';
import './App.css';
import MessageComponent from './components/messageComponent';
import {useSelector,useDispatch} from 'react-redux'; 
import LoginForm from './components/loginForm';
import UsersComponent from './components/usersComponent';
import { sessionLogout } from './features/session_reducer';
import {getUsers} from './features/users_reducer';
import {tokenActions} from './features/token_reducer';
import {loginActions} from './features/login_reducer';
import {jwtlogout} from './features/jwt_reducer';

function App() {
  
  const login_backend = useSelector((state)=>state.login.loginBackend);
  const token = useSelector((state)=>state.token.token);
  const jwttoken = useSelector((state)=>state.jwt.accesstoken);

  const dispatch = useDispatch();
  useEffect(()=>{
    if (login_backend){
      dispatch(getUsers(login_backend,token,jwttoken));
    }
  },[login_backend,token,jwttoken]);

  const logout = (login_backend) => {
    if (login_backend === "session"){
      dispatch(sessionLogout());
    }else if(login_backend === "token"){
      dispatch(tokenActions.resetToken());
    }else if(login_backend === "jwt-token"){
      dispatch(jwtlogout());
    }
    dispatch(loginActions.logout());
  };

  return (
    <div className="App">
      {<MessageComponent />}

      {!login_backend && <LoginForm/>}
      {login_backend && 
      (<div>
        <UsersComponent />
        <button onClick={() => logout(login_backend)}>Logout</button>
      </div>)}    
    </div>
  );
}

export default App;
