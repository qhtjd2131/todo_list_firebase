import styled from "styled-components";
import TodoList from "./TodoList";
import Logo from "./Logo";
import { useCallback, useEffect, useState } from "react";
import { excuteLogout, getOnAuthChanged, getSignInWithPopup } from "./firebase";
import { useCookies } from "react-cookie";

const GlobalWrapper = styled.section`
  width: 48rem;
  min-height: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  border: none;
  background-color: #d5d5f3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginButton = styled.button`
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

const LogOutButton = styled.button`
  width: 6rem;
  height: 2rem;
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

const HomeTitle = styled.div`
  font-size: 4rem;
  font-weight : 700;
  padding : 1.5rem;
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
      excuteLogout()
        .then(() => {
          setIsLogin(false);
          setUserInfo({ user: {}, token: "" });
          alert("로그아웃 성공");
          // removeCookie("SID");
          // cookies.remove();
        })
        .catch((error) => {
          alert("error");
        });
    }
  }, [isLogin]);

  useEffect(() => {
    console.log("useEffect excuted");

    getOnAuthChanged().then((userData: any) => {
      console.log("userdata:", userData);
      if (userData != null) {
        console.log("로그인 되어있는거같음");
        setIsLogin(true);
        setUserInfo({ ...userData });
      }
    });
  }, []);

  const home = () => {
    console.log("display name : ", userInfo.user.displayName);
    console.log("userinfo :", userInfo);
    if (isLogin) {
      return (
        <>
          <Logo username={userInfo.user.displayName} />
          <LogOutButton onClick={logoutButtonClickHandler}>Logout</LogOutButton>
          <TodoList />
        </>
      );
    } else {
      return (
        <>
          <HomeTitle>ToDo List</HomeTitle>
          <LoginButton onClick={loginButtonClickHandler}>
            LogIn Button
          </LoginButton>
        </>
      );
    }
  };

  return <GlobalWrapper>{home()}</GlobalWrapper>;
};

export default App;
