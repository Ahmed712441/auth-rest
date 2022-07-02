import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import sessionReducer from '../features/session_reducer';
import messageReducer from '../features/message_reducer';
import loginReducer from '../features/login_reducer';
import usersReducer from '../features/users_reducer';
import tokenReducer from '../features/token_reducer';
import jwtReducer from '../features/jwt_reducer';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    message:messageReducer,
    login:loginReducer,
    users:usersReducer,
    token:tokenReducer,
    jwt:jwtReducer,
  },
});
