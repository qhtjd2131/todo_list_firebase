import styled from "styled-components";
import TodoList from "./TodoList";
import Logo from "./Logo";
import {
  useCallback,
  useContext,
  useEffect,
  createContext,
  useState,
} from "react";
import { excuteLogout, getOnAuthChanged, getSignInWithPopup } from "./firebase";

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

  @media only screen and (max-width: 800px) {
    width: 36rem;
  }
  @media only screen and (max-width: 600px) {
    width: 24rem;
  }
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

const LogOutButton = styled(LoginButton)`
  width: 6rem;
  height: 2rem;
`;

const HomeTitle = styled.div`
  font-size: 4rem;
  font-weight: 700;
  padding: 1.5rem;
`;

//interface
interface IUser {
  [index: string]: any;
  user: any;
  token: string;
}

//context

export const userInfoContext : any = createContext({});
const App = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<IUser>({ user: {}, token: "" });

  // const checkLoginFunc = () => {
  //   const a = getOnAuthChanged().then((userData: any) => {
  //     console.log("userdata:", userData);
  //     if (userData != null) {
  //       console.log("로그인 되어있는거같음");
  //       setUserInfo({ ...userData });
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });

  //   return a;
  // };
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
      setIsLoading(false);
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
          {/* <LogOutButton
            onClick={() => {
              console.log("@@@@@@@", checkLoginFunc());
            }}
          >
            check login
          </LogOutButton> */}
          <userInfoContext.Provider value={{ userInfo }}>
            <TodoList />
          </userInfoContext.Provider>
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

  return (
    <GlobalWrapper>
      {isLoading ? "로그인 정보 확인중..." : home()}
    </GlobalWrapper>
  );
};

export default App;
