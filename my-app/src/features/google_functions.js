import { messageActions } from './message_reducer';
import { loginActions } from './login_reducer';
import { tokenActions } from './token_reducer';

export const responseGoogle = async (dispatch,response) => {
    const authtoken = 
    {access_token : response.credential};
    
    await fetch('http://localhost:8000/googleauth/',{
        method:'POST',
        body:JSON.stringify(authtoken),
        headers:{
            'Content-Type' :'application/json'
        }
    }).then((res) => {
        if (res.ok){
            return res.json() 
        }else{
            throw 'Wrong credentials'
        }
    }).then((data) => {
        dispatch(loginActions.login({backend:"token"}));
        dispatch(tokenActions.setToken({token:data.access_token}));
        localStorage.setItem("token",data.token);
    }).then(()=> {
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
    }
    );
}
