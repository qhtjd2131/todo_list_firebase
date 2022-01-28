import React from "react";
import styled from "styled-components";
import ListItem from "./ListItem"

//styled

const ListWrapper = styled.div`
  width: 100%;
`;


const TodoList = () => {
  return <ListWrapper>

    <ListItem />

    

  </ListWrapper>;
};

export default TodoList;
