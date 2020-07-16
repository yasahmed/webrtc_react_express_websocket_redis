import React from 'react';
import styled from 'styled-components';
import ChatMessages from '../chat-messages';
import ChatActions from '../chat-actions';


const ChatBox = styled.div`
flex:1;
height: 200px;
padding: 10px;
`;
const UsersName = styled.span`
margin-left: 21px;
`;

export default ({chatWith,messages}) =>{
  return (
    <ChatBox>
        <h2>Messages</h2>
        <ChatMessages messages={messages}/>
        <ChatActions chatWith={chatWith}/>
      </ChatBox>
    );
}


