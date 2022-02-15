import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Col from './grid/Col';
import Row from './grid/Row';
import styled from "styled-components";
import Profile from "./Profile";


const Wrapper = styled.div`
  max-width: 1320px;
  /* display: flex;
  justify-content: center; */
  margin: 0 auto;
  margin-top: 15px;
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

  li a.logo {
    font-size: 30px;
    font-family: 'SF_HambakSnow';
    color: #ffa8a8;
  }
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

const AppLayout = ({ children }) => {
  const dispatch = useDispatch(); 
  const { user } = useSelector((state) => state.user);

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
              {user ? <Button className="logOut"></Button> : (
                <Button className="logIn">
                  <Link to="/login">로그인</Link>
                </Button>
              )}
              <Button>글쓰기</Button>
            </div>
          </Col>
          <Col xs={12} md={6}>{ children }</Col>
          <Col xs={12} md={3}>
            {user ? <Profile /> : null}
          </Col>
        </Row>
      </Wrapper>
    </>
  );
};

export default AppLayout;
