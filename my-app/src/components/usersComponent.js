import {useSelector,useDispatch} from 'react-redux'; 

function UsersComponent(props){
    const data = useSelector((state) => state.users.data);
    const rows =  data.map((user) => {
        return (<tr>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                </tr>)
    } );
    return (
        <div>
            <table>
            <tr>
                <th>Id</th>
                <th>Email</th>
                <th>Name</th>
            </tr>
            {rows}
            </table>
        </div>
    )
}

export default UsersComponent;