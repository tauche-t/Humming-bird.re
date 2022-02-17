import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../Components/AppLayout";
import { loginAction } from "../Reducer/user";

const BackgroundWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /* width: 100%;
  height: 100vh; */
  background: #ffe3e3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  display: flex;
  width: 1320px;
  height: 710px;
  /* width: 68.75%;
  height: 70.95%; */
  background: #fff;
  /* max-width: 1320px; */
  /* height: 710px; */
  /* margin: 0 auto; */
  @media screen and (min-width: 1025px) and (max-width: 1320px) {
    width: 1024px;
  }
  @media screen and (max-width: 1024px) {
    display: block;
    width: 100%;
    max-width: 650px;
  }
  .left-logo {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffa8a8;
    h1 {
      font-size: 60px;
      font-family: 'SF_HambakSnow';
      color: #fff;
    }
  }
  .right-login-form {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10%;
    box-sizing: border-box;
    /* align-items: center; */
    @media screen and (max-width: 1024px) {
      display: block;
      padding: 28% 20%;
      width: 100%;
    }
    form {
      div {
        margin-bottom: 25px;
      }
      .buttonGruop {
        padding-top: 10px;
        text-align: center;
        a {
          display: block;
          text-decoration: none;
          color: #ffe3e3;
          font-size: 16px;
          margin-top: 20px;
        }
      }
    }
    h2 {
      text-align: center;
      font-size: 43px;
      color: #ffe3e3;
      margin-bottom: 55px;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 25px;
  border: 1px solid #b5b5b5;
  padding-left: 15px;
  box-sizing: border-box;

  &::placeholder {
    color: #b5b5b5;
  }

  &:focus {
    border: 1px solid #ffe3e3;
    outline: 1px solid #ffe3e3;
  }
`;

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { parsedUser } = useSelector(state => state.user);

  const onChange = useCallback((e) => {
    const { target: { name, value } } = e;

    if(name === "email") {
      setEmail(value);
    }else{
      setPassword(value);
    }
  }, [email, password]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    if(parsedUser) {
      const savedUser = JSON.parse(localStorage.getItem("signUpUser"));
      const havedUser = savedUser.find((v) => (v.email && v.password) === (email && password) );
      if(havedUser) {
        dispatch(loginAction(havedUser));
        navigate("/");
      }
    }
  }, [email, password]);
  
  return (
    <BackgroundWrapper>
      <LoginBox>
      <div className="left-logo">
          <h1>허밍버드</h1>
        </div>
        <div className="right-login-form">
          <h2>Log In</h2>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="email">이메일</label>
              <Input name="email" value={email} onChange={onChange}  />
            </div>
            <div>
              <label htmlFor="password">비밀번호</label>
              <Input name="password" value={password} onChange={onChange}  />
            </div>
            <div>
              <Button type="submit" className="logInButton">로그인</Button>
              <Link to="/signUp">회원가입</Link>
            </div>
          </form>
        </div>
      </LoginBox>
    </BackgroundWrapper>
  );
}

export default LoginForm;