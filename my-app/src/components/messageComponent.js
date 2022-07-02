import {useSelector,useDispatch} from 'react-redux'; 
import {messageActions} from '../features/message_reducer'

function MessageComponent(props){

    const message = useSelector((state)=>state.message);
    const dispatch = useDispatch();

    return (
        <div className ={"message "+message.type}  >
            <p className = "message-text">{message.message}</p>
            {message.message && <p onClick={() => dispatch(messageActions.hidemessage()) } className = "message-text">Hide</p>}
        </div>
    );
}

export default MessageComponent;