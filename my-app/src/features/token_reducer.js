import {createSlice} from '@reduxjs/toolkit';
import { messageActions } from './message_reducer';
import { loginActions } from './login_reducer';

const tokenSlice = createSlice({
    name:'token',
    initialState:{token:null},
    reducers:{
        setToken(state,action){
            state.token = action.payload.token;
        },
        resetToken(state){
            state.token = null;
            localStorage.removeItem("token");
        }
    }
});
const tokenReducer = tokenSlice.reducer; 
export default tokenReducer;
export const tokenActions = tokenSlice.actions;

export const tokenlogin = (username,password) => {
    return (async (dispatch) =>{
        dispatch(messageActions.displaymessage(
            {
                message:"login request is sent",
                type:"pending"
            }            
        ));
        const auth_obj = {
            username:username,
            password:password,
        };
        let response = await fetch("http://localhost:8000/token/",{
                                    method:"POST",
                                    headers:{
                                        'Content-Type' :'application/json'
                                    },
                                    body: JSON.stringify(auth_obj)
                                }
                            ).then((res)=> {
                                if (res.ok){
                                    dispatch(messageActions.displaymessage(
                                        {
                                            message:"login successfully",
                                            type:"sucess"
                                        }            
                                    ));
                                    return res.json();                                    
                                }else{
                                    throw 'invalid credientials';
                                }
                            }).then((data) => {
                                dispatch(loginActions.login({backend:"token"}));
                                dispatch(tokenActions.setToken({token:data.token}));
                                localStorage.setItem("token",data.token);
                            }).catch((err) => {
                                dispatch(messageActions.displaymessage(
                                    {
                                        message:err,
                                        type:"failure"
                                    }            
                                ));
                            }
                            );
        

    })
}




