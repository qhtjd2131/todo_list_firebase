import React from 'react';
import styled from 'styled-components';
import TodoList from './TodoList';
import Logo from "./Logo";


const GlobalWrapper = styled.section`
  width : 48rem;
  box-sizing : border-box;
  padding : 1rem;
  margin : 0 auto;

  border : 1px solid black;
`;


const App = () => {
  return (
    <GlobalWrapper>
      <Logo />
      
      <TodoList />

    </GlobalWrapper>
  )
}

export default App;
