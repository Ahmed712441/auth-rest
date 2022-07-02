import {createSlice} from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name:'users',
    initialState:{data:[]},
    reducers:{
        clearUsers(state){
            state.data = [];
        },
        setUsers(state,action){
            state.data = action.payload.data;
        }
    }
});
const usersReducer = usersSlice.reducer;
export default usersReducer;

export const usersActions = usersSlice.actions ;


export const getUsers = (auth_backend,token,jwttoken) => {
    return (async (dispatch) => {
        console.log(auth_backend);
        let data = null;
        if (auth_backend==="session"){
            data = await fetch("http://localhost:8000/users/",{credentials:"include"});
        }else if(auth_backend==="token"){
            data = await fetch("http://localhost:8000/users/",{
                    method:"GET",
                    credentials:"include",
                    headers:{
                        'Authorization':"Token "+ token,
                        'Content-Type': 'application/json'    
                    }
                });
        }else if(auth_backend==="jwt-token"){
            data = await fetch("http://localhost:8000/users/",{
                    method:"GET",
                    credentials:"include",
                    headers:{
                        //Authorization: Bearer <token>
                        'Authorization':"Bearer "+ jwttoken,
                        'Content-Type': 'application/json'    
                    }
                });
        }
        const arr = await data.json();
        dispatch(usersActions.setUsers({data:arr}));
    });
}

