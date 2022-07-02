import {createSlice} from '@reduxjs/toolkit';
import { messageActions } from './message_reducer';
import { loginActions } from './login_reducer';

const jwtSlice = createSlice({
    name:'jwt',
    initialState:{accesstoken : null},
    reducers:{
        setAccessToken(state,action){
            state.accesstoken = action.payload.accesstoken;
        },
        resetAccessToken(state,action){
            state.accesstoken = null;
        }
    }
});

const jwtReducer = jwtSlice.reducer;
export default jwtReducer;

export const jwtActions = jwtSlice.actions;


export const jwtLogin = (username,password) => {
    return (async (dispatch) => {
        dispatch(messageActions.displaymessage(
            {
                message:"login request is sent",
                type:"pending"
            }            
        ));
        const auth_obj = {
            email:username,
            password:password
        };
        await fetch('http://localhost:8000/auth/token',
            {
                method:'POST',
                body:JSON.stringify(auth_obj),
                headers:{
                    'Content-Type':'application/json'
                } 
            }
        ).then((res) => {
            if (res.ok){
                return res.json();
            }else{
                throw 'Wrong credientiels';
            }
        }).then((data) => {
            dispatch(jwtActions.setAccessToken({accesstoken:data.access}));
            localStorage.setItem("refresh",data.refresh);
        }).then(()=> {
            dispatch(loginActions.login({backend:"jwt-token"}));
            dispatch(messageActions.displaymessage(
                {
                    message:"login successfully",
                    type:"sucess"
                }            
            ));
        }
        ).catch((err) => {
            dispatch(messageActions.displaymessage(
                {
                    message:err,
                    type:"failure"
                }            
            ));
        })
        ;
    })
}


export const jwtrefresh = ()=>{
    return ( async (dispatch) => {
        const refresh = await localStorage.getItem("refresh");
        const reqbody = {refresh:refresh}; 
        if (refresh) {
            await fetch('http://localhost:8000/auth/token/refresh',{
                method:'POST',
                body:JSON.stringify(reqbody),
                headers:{
                    'Content-Type':'application/json'
                }
            }).then((req) => {
                if (req.ok){
                    return req.json();
                }else{
                    throw 'refresh token expired';
                }
            }).then((data) => {
                dispatch(jwtActions.setAccessToken({accesstoken:data.access}));
                localStorage.setItem("refresh",data.refresh); // in case of refresh token rotation
            })
        }else{
            throw 'not logged in';
        } 
    })
}


export const jwtlogout = () => {
    return ( async (dispatch) => {
        dispatch(jwtActions.resetAccessToken());
        localStorage.removeItem("refresh");
        dispatch(messageActions.displaymessage(
                {
                    message:"logout successfully",
                    type:"sucess"
                }            
            ));
    })
}