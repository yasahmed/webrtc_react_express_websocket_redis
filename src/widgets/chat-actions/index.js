import React, { useState, useContext } from "react";
import styled from "styled-components";
import { IContext } from "../../pages/current-room";

export default ({ chatWith }) => {
  const [message, setMessage] = useState("");
  const { gdata, gDispatch } = useContext(IContext);


  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown=(e)=>{
    if (e.key === 'Enter') {
      makeChat()
    }
  }

  const makeChat=()=>{
    chatWith(message);
    setMessage("");
  }

  return (
    <ChatActions>
      <ChatInput onChange={handleChange} value={message} onKeyDown={handleKeyDown} />
      <ChatButton className={(message=="" || gdata.selectedUser==null)?"disabled":""} type="button" onClick={() => {
        makeChat();
      }}>
        Send
      </ChatButton>
    </ChatActions>
  );
};

const ChatActions = styled.div`
  display: flex;
  border: 3px solid #ffca28;
  width: 100%;
`;

const ChatInput = styled.input`
  flex: 1;
  height: 50px;
  border: 0;
  outline: none;
  padding-left: 10px;
  font-size: 20px;
`;

const ChatButton = styled.button`
  width: 100px;
  border: 0;
  background-color: #ff9100;
  color: white;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  &.disabled{
    cursor:none;
    background-color:grey;
  }
`;
