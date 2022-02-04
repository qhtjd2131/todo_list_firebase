import React from "react";
import styled from "styled-components";
import ListItem from "./ListItem";

//styled

const ListWrapper = styled.div`
  width: 100%;
  background-color: #d5d5f3;
  height: 100%;
  padding: 1rem;
  box-sizing : border-box;
  margin: 0;
`;

const TodoList = () => {
  return (
    <ListWrapper>
      <ListItem />
    </ListWrapper>
  );
};

export default TodoList;
