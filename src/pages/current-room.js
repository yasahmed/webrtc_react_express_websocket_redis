import React, { useState, useEffect, useReducer } from "react";
import UserLists from "../widgets/user-lists";
import UserConversationBlock from "../widgets/user-conversation-block";
import ChatContainer from "../widgets/chat-container";
import InputSearchLeftBlock from "../widgets/input-search-left-block";
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
      do {
        username = prompt("Set Yout name");
      } while (username == null || username == "");
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
      gDispatch({
        type: SET_CONNECTED_USERS,
        payload: users.filter((x) => x != username),
      });
    });

    socket.on("remove-user", ({ socketId }) => {
      gDispatch({ type: REMOVE_USER, payload: socketId });
    });

    socket.on("resp-chat-user", (data) => {
      console.log("data", data);
      setMessages((messages) => [
        ...messages,
        {
          type: data.from == localStorage.getItem("user") ? "mine" : "other",
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
        from: localStorage.getItem("user"),
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
        <SplitedDivs className="border-bottom configure">
          <LeftTools>
            <IconTop className="fa fa-times" aria-hidden="true" />
          </LeftTools>

          <CenterTools></CenterTools>

          <RightTools>
            <IconTop className="fa fa-cog" aria-hidden="true" />
            <IconTop className="fa fa-sign-out" aria-hidden="true" />
          </RightTools>
        </SplitedDivs>

        <SplitedDivs className="column">
          <ColumnDivs>
            <InputSearchLeftBlock />
            <UserConversationBlock />
            <UserConversationBlock />
            <UserConversationBlock />
            <UserConversationBlock />
          </ColumnDivs>
          <ColumnDivs className="center"></ColumnDivs>
          <ColumnDivs></ColumnDivs>
        </SplitedDivs>
      </Container>

    </IContext.Provider>
  );
};

const Container = styled.div`
  max-width: 1400px;
  height: 70vh;
  width: 1200px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    -2px 8px 24px 10px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #909090, -2px 8px 24px 10px rgba(0, 0, 0, 0);
`;

const SplitedDivs = styled.div`
 background-color:white;
 &.border-bottom{
   border-bottom:1px solid #ececec;d
 }
 &.configure{
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
 }

 &.column{
  display: flex;
  flex:1;
 }
`;

const LeftTools = styled.div`
  display: flex;
  &.tool {
  }
`;

const RightTools = styled.div`
  padding-left: 13px;
  display: flex;
  &.tool {
  }
  & i {
    padding-left: 13px;
  }
`;

const CenterTools = styled.div`
  flex: 1;
`;

const IconTop = styled.i`
  color: #b1b1b1;
  font-size: 19px;
  cursor: pointer;
  &:active {
    color: #5a5a5a;
  }
  &:hover {
    color: #9e9e9e;
  }
`;

const ColumnDivs = styled.div`
  width: 250px;
  text-align: center;
  border-right: 1px solid #ececec;
  &.center {
    flex: 1;
  }
`;
