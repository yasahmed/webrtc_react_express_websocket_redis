import React from "react";
import styled from "styled-components";

export default () => {
  return (
    <UserConversationProfile>
        <UserConversationProfileImage src="https://cdn.dribbble.com/users/115601/avatars/small/00a4a5cc261b569a75a721069bae271e.png?1552942290" />

        <UserConversationProfileLeftBlock>

          <div className="center">
            <div className="child username">JNAH Ahmed</div>
            <div className="child message">merci chef !</div>
          </div>

          <div className="center">
            <div className="child time">8:28 AM</div>
            <div className="child bull">2</div>
          </div>

        </UserConversationProfileLeftBlock>
    </UserConversationProfile>
  );
};

const UserConversationProfile = styled.div`
  display: flex;
  width: calc(100% - 10px);;
  border-right: 1px solid #ececec;
  padding-left: 10px;
  padding-top: 10px;
  align-items: center;
`;

const UserConversationProfileImage = styled.img`
  border-radius: 100px;
  height: 40px;
  width: 40px;
`;

const UserConversationProfileLeftBlock = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ececec;
  padding-bottom:8px;
  flex: 1;
  padding: 10px;

  .child {
    display: flex;
    blackground-color: red;
  }

  .bull {
    width: 20px;
    height: 20px;
    background: rgb(168, 162, 239);
    border-radius: 100px;
    justify-content: center;
    color: white;
    font-size: 11px;
    line-height: 20px;
    font-weight: 700;
    margin: auto;
    margin-right: 0;
    margin-bottom: 0;
    margin-top: 0;
  }

  .username {
    font-size: 12px;
    font-weight: 600;
    color: #404040;
  }

  .time {
    color: grey;
    font-size: 11px;
  }
  
  .center{
    display: inline-flex;
    justify-content: center;
    flex-direction: column;
  }

  .message{
    font-size: 11px;
    color: grey;
  }
`;
