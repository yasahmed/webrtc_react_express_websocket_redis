import React, { useContext, useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export default () => {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const addUserToRoom = () => {};

  const createRoom = () => {
    Axios.post(`https://chatapp908.herokuapp.com/room`, {
      roomId: roomId,
    })
      .then((resp) => {
        console.log("room created");
        history.push("/room/"+roomId);
      })
      .catch((err) => {
        if (err.response.status == 400) {
          setError("Name Already used !");
        }
      });
  };

  return (
    <Container>
      <SubContainer>
        <HH2>Create your public room</HH2>
        <Input onChange={(e) => setRoomId(e.target.value)} placeholder="Set room name..." />
        <br />
        <Button onClick={createRoom} type="button">
          Create it
        </Button>
      </SubContainer>
    </Container>
  );
};

const Container = styled.div`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
`;

const SubContainer = styled.div`
color: black;
background-color: white;
margin: auto;
border-radius: 10px;
background: rgb(155,188,208);
background: linear-gradient(180deg, rgba(155,188,208,1) 0%, rgba(216,221,217,1) 50%, rgba(224,218,200,1) 100%);
max-width: 600px;
padding: 9px;
`;

const HH2 = styled.h2`
  font-size: 16px;
  color: #8e8d8d;
`;

const Input = styled.input`
  width: 500px;
  max-width: 500px;
  height: 52px;
  padding-left: 20px;
  font-size: 20px;
  border-radius: 40px;
  outline: 0;
  color: black;
  border: 2px solid #bbbbbb;
  `;

const Button = styled.button`
  height: 52px;
  background-color: #fff;
  border: 1px solid #ececec;
  outline: 0;
  margin: 10px;
  border-radius: 99px;
  padding: 14px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  color: #909090;
`;
