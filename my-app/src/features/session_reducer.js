import {createSlice} from '@reduxjs/toolkit';
import { messageActions } from './message_reducer';
import { loginActions } from './login_reducer';


const sessionLoginSlice = createSlice({
    name:'session',
    initialState:{csrf:null},
    reducers:{
        set_csrf(state,action){
            state.csrf = action.payload.csrf;
        }
    }
});

export const sessionActions = sessionLoginSlice.actions ;


export const sessionLogin = (username,password,csrf) => {
    return  (async (dispatch) => {
        
        dispatch(messageActions.displaymessage(
            {
                message:"login request is sent",
                type:"pending"
            }            
        ));
        if (! csrf){
            let response = await fetch("http://localhost:8000/getcsrf/",{
            credentials:"include"
            });
            csrf = await response.json();
            csrf = csrf.token;
            dispatch(sessionActions.set_csrf(
                {csrf:csrf}
            ));
        }
        const auth_obj = {
            email:username,
            password:password,
        }
        let response = await fetch("http://localhost:8000/login/",{
                                    method:"POST",
                                    credentials:"include",
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-CSRFToken': csrf
                                    },
                                    body: JSON.stringify(auth_obj)
                                }
                            ).then((res) => {
                                if (res.ok){
                                    dispatch(messageActions.displaymessage(
                                        {
                                            message:"login successfully",
                                            type:"sucess"
                                        }            
                                    ));
                                    dispatch(loginActions.login({backend:"session"}));
                                    dispatch(sessionActions.set_csrf({csrf:null}));
                                }else{
                                    dispatch(messageActions.displaymessage(
                                        {
                                            message:"Wrong credientails, Try again",
                                            type:"failure"
                                        }            
                                    ));
                                }
                            }).catch((err) => console.log(err) );
                            
    })
};

export const sessionLogout = () => {

    return  (async (dispatch) => {
        dispatch(messageActions.displaymessage(
            {
                message:"logout request is sent",
                type:"pending"
            }            
        ));
        let csrf_response = await fetch("http://localhost:8000/getcsrf/",{
            credentials:"include"
            });
            let csrf = await csrf_response.json();
            csrf = csrf.token;
            
        let response = await fetch("http://localhost:8000/logout/",{
                                    method:"POST",
                                    credentials:"include",
                                    headers:{
                                        'Content-Type': 'application/json',
                                        'X-CSRFToken': csrf
                                    },
                                    body:''
                                }
                            );
        dispatch(messageActions.displaymessage(
            {
                message:"logout successfully",
                type:"sucess"
            }            
        ));
        // dispatch(loginActions.logout());
    });

};


const sessionReducer = sessionLoginSlice.reducer;
export default sessionReducer;
