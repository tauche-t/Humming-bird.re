import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from "react";
import { useState } from "react";
import { NAME_MODIFY_REQUEST } from "../Reducer/user";
import { useEffect } from "react";
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const UserProfileWrap = styled.div`
  width: 100%;
  height: 370px;
  position: relative;
  border: 1px solid #e1dddd;
  border-radius: 20px;
  .userText {
    padding-top: 20%;
  }
  @media screen and (min-width: 501px) and (max-width: 1320px) {
    height: 320px;
  }
`;

export const PropfileBanner = styled.div`
  background: #ffd8d8;
  height: 118px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: relative;
  @media screen and (min-width: 501px) and (max-width: 1320px) {
    height: 98px;
  }
`;

export const ProfilePicture = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -50px;
  width: 95px;
  height: 95px;
  border: 1px solid #efecec;
  border-radius: 50%;
  background: #fff;
  z-index: 10;
  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
  }
  @media screen and (min-width: 501px) and (max-width: 1320px) {
    width: 85px;
    height: 85px;
    bottom: -40px;
  }
  &::before {
    content: '';
    display: block;
    width: 86px;
    height: 86px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fac7c7;
    z-index: 5;
    @media screen and (min-width: 501px) and (max-width: 1320px) {
      width: 76px;
      height: 76px;
    }
  }
`;

const UserTitle = styled.div`
  text-align: center;
  line-height: 20px;
  h2 {
    font-size: 20px;
    font-weight: bold;
    @media screen and (min-width: 501px) and (max-width: 1320px) {
      font-size: 18px;
    }
  }
  p {
    font-size: 12px;
  }
`;

const Form = styled.form`
  position: relative;
  width: 140px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #adb5bd;
  border-radius: 25px;
  padding: 3px 10px;
  box-sizing: border-box;
`;

const ProfileCorrection = styled.button`
  display: block;
  width: 75px;
  height: 20px;
  margin: 0 auto;
  outline: none;
  border: 1px solid #e1dddd;
  background: #fff;
  border-radius: 10px;
  font-size: 10px;
  margin-top: 10px;
  cursor: pointer;
`;

const UserInfo = styled.div`
  width: 100%;
  height: 50px;
  position: absolute;
  left: 0;
  bottom: 0;
  border-top: 1px solid #e1dddd;
  ul {
    display: flex;
    text-align: center;
    height: 100%;
    align-items: center;
    li {
      flex: 1;
      font-size: 13px;
      color: #6f6e6e;
      @media screen and (min-width: 501px) and (max-width: 1320px) {
        font-size: 11px;
      }
      span {
        display: block;
        margin-top: 5px;
        @media screen and (min-width: 501px) and (max-width: 1320px) {
          font-size: 11px;
        }
      }
    }
    li:not(:last-child) {
      border-right: 1px solid #e1dddd;
    }
  }
`;

const ModifyButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 21px;
  position: absolute;
  right: -5px;
  top: 0px;
  color: #a5d8ff;
  cursor: pointer;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { nameModifyDone } = useSelector((state) => state.user);

  const [modify, setModify] = useState(false);
  const [changeName, setChangeName] = useState("");

  const onClickModify = useCallback(() => {
    setModify(prev => !prev);
  }, [modify]);

  const onChangeName = useCallback((e) => {
    setChangeName(e.target.value);
  }, [changeName]);

  const onSubmitName = useCallback((e) => {
    e.preventDefault();

    if(!changeName) return;

    dispatch({
      type: NAME_MODIFY_REQUEST,
      data: changeName,
    });

    setModify(false);
  }, [changeName]);

  useEffect(() => {
    if(nameModifyDone) {
      setChangeName("");
    }
  }, [nameModifyDone]);

  return (
    <UserProfileWrap>
    <PropfileBanner>
      <ProfilePicture>
        <span>{ user.nickname[0] }</span>
      </ProfilePicture>
    </PropfileBanner>

    <div className="userText">
      <UserTitle>
        { modify ? (
          <Form onSubmit={onSubmitName}>
            <Input type="text" value={changeName} onChange={onChangeName} placeholder={user.nickname} />
            <ModifyButton type="submit"><BsFillArrowRightCircleFill /></ModifyButton>
          </Form>
        ) : (
          <h2>{user.nickname}</h2>
        ) }
        <p>@profile1</p>
      </UserTitle>

      <ProfileCorrection type="button" onClick={onClickModify}>{ modify ? "취소" : "프로필 수정" }</ProfileCorrection>
    </div>

    <UserInfo>
      <ul>
        <li>Likes <span>0</span></li>
        <li>게시글 <span>{ user.Posts.length }</span></li>
        <li>댓글 <span>{ user.Comments.length }</span></li>
      </ul>
    </UserInfo>
  </UserProfileWrap>
  );
}

export default Profile;