import styled from "styled-components";

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoTitle = styled.p`
  font-size: 28px;
  font-weight: 700;
  text-align: center;

  margin : 1rem 0;

  border: 1px solid black;
  padding : 4px;
`;

const Logo = () => {
  return (
    <LogoWrapper>
      <LogoTitle>To Do List</LogoTitle>
    </LogoWrapper>
  );
};

export default Logo;
