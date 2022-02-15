import styled from "styled-components";
import { useSelector } from 'react-redux';

const UserProfileWrap = styled.div`
  width: 100%;
  height: 370px;
  position: relative;
  border: 1px solid #e1dddd;
  border-radius: 20px;

  .userText {
    padding-top: 20%;
  }
`;

export const PropfileBanner = styled.div`
  background: #e1dddd;
  height: 118px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: relative;
`;

export const ProfilePicture = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -50px;
  width: 95px;
  height: 95px;
  border: 1px solid #e1dddd;
  border-radius: 50%;
  background: #fff;
  z-index: 10;

  span {
    display: block;
    width: 86px;
    height: 86px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #e1dddd;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
  }
  /* &::before {
    content: ${(props) => props.nickname};
    display: block;
    width: 86px;
    height: 86px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #e1dddd;
    z-index: 5;
  } */
`;

const UserTitle = styled.div`
  text-align: center;
  line-height: 20px;

  h2 {
    font-size: 20px;
    font-weight: bold;
  }

  p {
    font-size: 12px;
  }
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
  color: #c8c7c7;
  margin-top: 10px;
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
      span {
        display: block;
        margin-top: 5px;
      }
    }
    li:not(:last-child) {
      border-right: 1px solid #e1dddd;
    }
  }
`;


const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <UserProfileWrap>
    <PropfileBanner>
      <ProfilePicture>
        <span>{ user.nickname[0] }</span>
      </ProfilePicture>
    </PropfileBanner>

    <div className="userText">
      <UserTitle>
        <h2>{user.nickname}</h2>
        <p>@profile1</p>
      </UserTitle>

      <ProfileCorrection>프로필 수정</ProfileCorrection>
    </div>

    <UserInfo>
      <ul>
        <li>Likes <span>0</span></li>
        <li>게시글 <span>0</span></li>
        <li>댓글 <span>0</span></li>
      </ul>
    </UserInfo>
  </UserProfileWrap>
  );
}

export default Profile;