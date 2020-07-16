import React from 'react';
import styled from 'styled-components';


const ChatContent = styled.div`
background-color: white;
display: flex;
width: 100%;
height: 500px;
flex-direction: column;
border:3px solid #FFCA28;
border-bottom: 0;
`;

const ChatMessage = styled.div`
width: fit-content;
padding: 13px;
margin: 10px;
border-radius: 100px;
&.other{
  background-color: #f2bcf8;
  align-self: flex-end;
}
&.mine{
  background-color: #ffc77d;
}
`;

export default ({messages}) =>{
  
  return (
    <ChatContent>
      {
        messages.map(message=>(
        <ChatMessage key={message.message} className={message.type}>{message.message}</ChatMessage>
        ))
      }
    </ChatContent>
    );
}


