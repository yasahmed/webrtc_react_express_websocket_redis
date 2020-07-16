import React, { useContext, useState } from "react";
import styled from "styled-components";
import Axios from "axios";

export default () => {
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");

  const addUserToRoom = () => {};
  const createRoom = () => {
    Axios.post(`https://chatapp908.herokuapp.com/room`, {
      roomId: roomId,
    })
      .then((resp) => {
        console.log("room created");
      })
      .catch((err) => {
        if (err.response.status == 400) {
          setError("Name Already used !");
        }
      });
  };
  return (
    <Container>
      <h2>Create your public room</h2>
      <Input onChange={(e) => setRoomId(e.target.value)} />
      <br />
      <Button onClick={createRoom} type="button">
        Create it
      </Button>
    </Container>
  );
};

const Container = styled.div``;

const Input = styled.input`
  width: 500px;
  max-width: 500px;
  height: 52px;
  padding-left: 20px;
  font-size: 20px;
`;

const Button = styled.button`
  height: 52px;
  font-size: 20px;
`;
