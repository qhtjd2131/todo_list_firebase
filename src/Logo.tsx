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

  border: none;
  padding : 4px;
`;

//interface

interface ILogo {
  [index : string ] : any;
  username : string;
}
const Logo = ( { username } : ILogo) => {
  return (
    <LogoWrapper>
      <LogoTitle>{username}님의 To Do List</LogoTitle>
    </LogoWrapper>
  );
};

export default Logo;
