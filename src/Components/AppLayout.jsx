import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Col from './grid/Col';
import Row from './grid/Row';
import styled from "styled-components";
import Profile from "./Profile";
import PostForm from "./PostForm";


const Wrapper = styled.div`
  max-width: 1320px;
  /* display: flex;
  justify-content: center; */
  margin: 0 auto;
  margin-top: 15px;
  @media screen and (min-width: 1025px) and (max-width: 1320px) {
    max-width: 1024px;
  }
  @media screen and (max-width: 1024px) {
    max-width: 100%;
    width: 100%;
  }
`;

const MenuWrap = styled.div`
  /* position: fixed;
  width: 15.4%;
  top: 0; */
  padding-top: 15px;
  height: 100%;
  /* border-right: 1px solid #e1dddd; */
`;

const Menu = styled.ul`
  li {
    text-align: center;
    margin-bottom: 30px;
  }
  li a {
    text-decoration: none;
    color: #000;
    font-size: 20px;
    font-family: 'Nanum Gothic', sans-serif;
  }
  li span {
    font-size: 20px;
    vertical-align: bottom;
    cursor: pointer;
    @media screen and (min-width: 501px) and (max-width: 1024px) {
      font-size: 0;
    }
  }
  li svg {
    font-size: 28px;
  }
  li a.logo {
    font-size: 30px;
    font-family: 'SF_HambakSnow';
    color: #ffa8a8;
  }
`;

const LogBtn = styled.div`
    color: #000;
    font-size: 19px;
    font-family: 'Nanum Gothic', sans-serif;
`;

export const Button = styled.button`
  display: block;
  width: 90px;
  height: 25px;
  background: #ffa8a8;
  border-radius: 15px;
  color: #fff;
  border: none;
  outline: none;
  margin: 0 auto;
  cursor: pointer;
  &.logIn, &.logOut {
    border: 1px solid #a5d8ff;
    background: #fff;
    color: #a5d8ff;
    margin-bottom: 25px;
  }
  &.logInButton {
    width: 175px;
    height: 45px;
    font-size: 18px;
    border-radius: 30px;
  }
  &.signButton {
    width: 115px;
    height: 35px;
    border-radius: 20px;
    margin: 0 10px;
  }
  &.cancelButton {
    width: 115px;
    height: 35px;
    border-radius: 20px;
    background: #fff;
    border: 1px solid #ffa8a8;
    color: #ffa8a8;
    margin: 0 10px;
  }
`;

const WriteWrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostBox = styled.div`
  width: 800px;
  height: 300px;
  padding: 100px;
  background: #fff;
  box-sizing: border-box;
  border-radius: 10px;
`;

const AppLayout = ({ children }) => {
  const dispatch = useDispatch(); 
  const { user } = useSelector((state) => state.user);
  const { addPostDone } = useSelector((state) => state.post);
  const [write, setWrite] = useState(false);

  const onClickWrite = useCallback(() => {
    setWrite(true);
  }, [write]);

  useEffect(() => {
    if(addPostDone) {
      setWrite(false);
    }
  }, [addPostDone]);

  return(
    <>
      <Wrapper>
        <Row>
          <Col xs={12} md={3}>
            <div>
              <Menu>
                <li>
                  <Link to="/" className="logo">허밍버드</Link>
                </li>
              </Menu>
              {user ? <Button className="logOut">로그아웃</Button> : (
                <Button className="logIn">
                  <Link to="/login">로그인</Link>
                </Button>
              )}
              <Button onClick={onClickWrite}>글쓰기</Button>
            </div>
          </Col>
          <Col xs={12} md={6}>{ children }</Col>
          <Col xs={12} md={3}>
            {user ? <Profile /> : null}
          </Col>
        </Row>
      </Wrapper>

      { write ? (
        <>
          <WriteWrap>
            <PostBox>
              <PostForm />
            </PostBox>
          </WriteWrap>
        </>
      ) : null }
    </>
  );
};

export default AppLayout;
