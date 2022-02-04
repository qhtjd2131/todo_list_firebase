import styled from 'styled-components';
import TodoList from './TodoList';
import Logo from "./Logo";

const GlobalWrapper = styled.section`
  width : 48rem;
  box-sizing : border-box;
  margin : 0 auto;
  border : none;
  background-color: #d5d5f3;
 
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
