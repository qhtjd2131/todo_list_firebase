import styled from "styled-components";
import TodoList from "./TodoList";
import Logo from "./Logo";
import { useCallback, useEffect, useState } from "react";
import { excuteLogout, getOnAuthChanged, getSignInWithPopup } from "./firebase";
import { useCookies } from "react-cookie"; 
import { ALL } from "dns";

const GlobalWrapper = styled.section`
  width: 48rem;
  min-height: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  border: none;
  background-color: #d5d5f3;
`;

const LoginButton = styled.button`
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12rem;
  height: 4rem;
  font-size: 1.5rem;

  background-color: #9696b3;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #7d7d96;
  }

  &:active {
    background-color: #5b5b6d;
  }
`;

//interface
interface IUser {
  [index: string]: any;
  user: any;
  token: string;
}
const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState<IUser>({ user: {}, token: "" });
  const [cookies, setCookie, removeCookie] = useCookies();

  const loginButtonClickHandler = useCallback(() => {
    if (!isLogin) {
      getSignInWithPopup().then((loginData: any) => {
        setUserInfo({ ...loginData });
        setIsLogin(true);
        console.log("logindata:", loginData);
      });
    } else {
      alert("이미 로그인 되어 있습니다.");
    }
  }, [isLogin]);

  const logoutButtonClickHandler = useCallback(() => {
    if (isLogin) {
      excuteLogout().then(() => {
        setIsLogin(false);
        setUserInfo({ user: {}, token: "" });
        alert("로그아웃 성공");
        removeCookie()
        
      }).catch((error)=>{
        alert("error")
      });
    }
  }, [isLogin]);

  useEffect(() => {
    const userData = getOnAuthChanged();
    console.log("inuseeffect:",userData);
    if (userData != null) {
      console.log("로그인 되어있는거같음")
      setIsLogin(true);
      setUserInfo(userData);
    }
  }, []);

  const home = () => {
    if (isLogin) {
      return (
        <>
          <Logo username={userInfo.user.displayName} />
          <LoginButton onClick={logoutButtonClickHandler}>LogOut</LoginButton>
          <TodoList />
        </>
      );
    } else {
      return (
        <LoginButton onClick={loginButtonClickHandler}>
          LogIn Button
        </LoginButton>
      );
    }
  };

  return <GlobalWrapper>{home()}</GlobalWrapper>;
};

export default App;
