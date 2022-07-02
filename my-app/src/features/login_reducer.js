import {createSlice} from '@reduxjs/toolkit';


const LoginSlice = createSlice({
    name:'login',
    initialState: {loginBackend:null},
    reducers:{
        login(state,action){
            state.loginBackend = action.payload.backend;
        },
        logout(state){
            state.loginBackend = null;
        }
    }
});

const loginReducer = LoginSlice.reducer;
export default loginReducer;

export const loginActions = LoginSlice.actions;
 