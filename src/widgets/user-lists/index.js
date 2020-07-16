import React,{useContext} from 'react';
import styled from 'styled-components';
import UserItem  from '../user-item';
import { IContext } from '../../pages/current-room';


const UsersListContainer = styled.div`
width: 200px;
height: 200px;
padding: 10px;
cursor: pointer;

`;

const UsersList = styled.ul`
background-color: white;
padding-left: 0;
list-style: none;
`;

export default () =>{
  const {gdata, gDispatch} = useContext(IContext);

  return (
    <UsersListContainer>
    <h2>Users List</h2>
      <UsersList>
        {
          gdata.connectedUsers.map(user=>(
             <UserItem key={user} name={user}/>
          ))
        }
        
      </UsersList>
  </UsersListContainer>
  );
}


