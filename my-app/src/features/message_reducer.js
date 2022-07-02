import { createSlice } from "@reduxjs/toolkit";


const messageSlice = createSlice({
    name:'message',
    initialState:{
        message:null,
        type:null,
    },
    reducers: {
        displaymessage(state,action){
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        hidemessage(state){
            state.message = null;
            state.type = null;
        }
    }
})

const messageReducer =  messageSlice.reducer;

export default messageReducer;

export const messageActions =  messageSlice.actions;
