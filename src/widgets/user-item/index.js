import React, { useContext } from "react";
import styled from "styled-components";
import { IContext } from "../../pages/current-room";
import { SET_SELECTED_USER } from "../../store/actions";

export default ({ name }) => {
  const { gdata, gDispatch } = useContext(IContext);

  const selectUser = (usr) => {
    gDispatch({ type: SET_SELECTED_USER, payload: usr });
  };

  const isSelected = () => (gdata.selectedUser === name ? "selected-user" : "");

  return (
    <UserElem className={isSelected()} onClick={() => selectUser(name)}>
      <UsersName>{name}</UsersName>
    </UserElem>
  );
};

const UserElem = styled.li`
  padding: 10px;
  &::before {
    width: 15px;
    height: 15px;
    content: " ";
    display: block;
    background-color: green;
    margin: 0;
    padding: 0;
    position: absolute;
    border-radius: 50%;
  }
  &.selected-user {
    background-color: #aed581;
  }
`;
const UsersName = styled.span`
  margin-left: 21px;
`;
