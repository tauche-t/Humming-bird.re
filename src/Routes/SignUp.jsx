import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../Components/AppLayout";
import useInput from "../hooks/useInput";
import { SIGN_UP_REQUEST } from "../Reducer/user";
import { Input } from "./Login";


const SignUpWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: cneter;
  align-items: center;
  background: #ffe3e3;
`;

const FormBox = styled.div`
  width: 770px;
  height: 800px;
  margin: 0 auto;
  background: #fff;
  position: relative;
  border-radius: 10px;
  /* width: 680px; */
  /* height: 710px; */

  @media screen and (min-width: 1025px) and (max-width: 1240px) {
    width: 650px;
    height: 740px;
  }

  @media screen and (max-width: 1024px) {
    width: 80%;
  }

  .formWrap {
    width: 485px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    @media screen and (min-width: 1025px) and (max-width: 1240px) {
      width: 320px;
    }

    @media screen and (max-width: 1024px) {
      width: 80%;
    }

    h1 {
      font-size: 48px;
      color: #ffe3e3;
      font-weight: bold;
      margin-bottom: 50px;
    }
    div {
      margin-bottom: 28px;
    }
    .agreeCheck {
      padding-left: 10px;
      text-align: left;
      margin-top: -10px;
      margin-bottom: 37px;
      span {
        margin-left: 5px;
        color: #ffe3e3;
      }
    }
    .buttonGroup {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChagnePasswordConfirm = useCallback((e) => {
    setPasswordConfirm(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });

    navigate("/login");
  }, [email, password, nickname]);

  return (
    <SignUpWrapper>
      <FormBox>
        <div className="formWrap">
          <h1>Sign Up</h1>
          <form onSubmit={onSubmit}>
            <div>
              <Input type="email" name="email" value={email} onChange={onChangeEmail} placeholder="이메일" />
            </div>
            <div>
              <Input name="nickname" value={nickname} onChange={onChangeNickname} placeholder="닉네임" />
            </div>
            <div>
              <Input type="password" name="password" value={password} onChange={onChangePassword} placeholder="비밀번호" />
            </div>
            <div className="passwordConfirm">
              <Input name="sign-passwordConfirm" type="password" value={passwordConfirm} onChange={onChagnePasswordConfirm} required placeholder="비밀번호 확인" />
              {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
            </div>
            <div>
              <Button type="submit" className="logInButton">회원가입</Button>
              <Link to="/login" style={{ display: "block", marginTop: "20px" }}>취소</Link>
            </div>
          </form>
        </div>
      </FormBox>
    </SignUpWrapper>
    );
}

export default SignUp;