import React, { useState, useEffect, useReducer } from "react";
import UserLists from "../widgets/user-lists";
import ChatContainer from "../widgets/chat-container";
import styled from "styled-components";
import socketIOClient from "socket.io-client";
import { reducerIO } from "../store/reducer";
import { initialState } from "../store/initialState";
import { SET_CONNECTED_USERS, REMOVE_USER } from "../store/actions";
import { useRouteMatch } from "react-router-dom";
import Axios from "axios";

export let socket;
export const IContext = React.createContext();

export default () => {
  const [gdata, gDispatch] = useReducer(reducerIO, initialState);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const { id: roomId } = useRouteMatch("/room/:id").params;

  const init = () => {
    var username = "";
    if (localStorage.getItem("user") == null) {
      do{
        username = prompt("Set Yout name");
    }while(username == null || username == "" );
    } else var username = localStorage.getItem("user");

    localStorage.setItem("user", username);
    console.log("room", roomId);

    socket = socketIOClient("https://chatapp908.herokuapp.com");

    socket.on("connect", function () {
      associateUserSocket(socket.id, () => {
        socket.emit("setup-connection", {
          user: localStorage.getItem("user"),
        });
      });
    });

    socket.on("update-user-list", ({ users }) => {
      console.log("spocket usrs", users);
      gDispatch({ type: SET_CONNECTED_USERS, payload: users.filter(x=>x!=username) });
    });

    socket.on("remove-user", ({ socketId }) => {
      gDispatch({ type: REMOVE_USER, payload: socketId });
    });

    socket.on("resp-chat-user", (data) => {
      console.log("data",data);
      setMessages((messages) => [
        ...messages,
        {
          type: data.from==localStorage.getItem("user")?"mine":"other",
          message: data.message,
        },
      ]);
    });
  };

  useEffect(() => {
    init();
    return () => {
      if (socket) socket.close();
    };
  }, []);

  const chatWith = (msg) => {
    if (msg && msg != "") {
      socket.emit("req-chat-user", {
        message: msg,
        from:localStorage.getItem("user")
      });
    }
  };

  const associateUserSocket = (socketId, callback) => {
    Axios.post(`https://chatapp908.herokuapp.com/room/users/socket`, {
      socketId: socketId,
      user: localStorage.getItem("user"),
    })
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem("roomId", roomId);
        callback();
      })
      .catch((err) => {
        if (err.response.status == 400) {
          setError("Name Already used !");
        }
      });
  };

  return (
    <IContext.Provider
      value={{
        gdata,
        gDispatch,
      }}
    >
      <Container>
        <ChatContainer chatWith={chatWith} messages={messages} />
        <UserLists />
      </Container>
    </IContext.Provider>
  );
};

const Container = styled.div`
  padding: 100px;
  display: flex;
`;
