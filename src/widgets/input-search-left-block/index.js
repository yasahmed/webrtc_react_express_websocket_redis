import React from "react";
import styled from "styled-components";


export default () => {
  return (
    <Container>
      <IconTop className="fa fa-search" aria-hidden="true" />
      <Input />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 94%;
  border: 1px solid #ececec;
  align-items: center;
  border-radius: 16px;
  margin: auto;
  margin-top: 10px;
`;

const Input = styled.input`

  padding: 6px;
  width: 84%;
  border:0;
  outline: none;
  border-radius: 16px;
`;


const IconTop = styled.i`
  color: #ececec;
  font-size: 19px;
  cursor: pointer;
  margin-left: 10px;
  &:active {
    color: #5a5a5a;
  }
  &:hover {
    color: #9e9e9e;
  }
`;
