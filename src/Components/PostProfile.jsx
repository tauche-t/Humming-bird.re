import React from 'react';
import styled from 'styled-components';

const ContentWrap = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;

  h2 {
    font-size: 23px;
    font-weight: normal;
    margin-bottom: 10px;
  }

  p {

  }
`;

export const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  /* font-weight: bold; */
  width: 60px;
  height: 60px;
  /* padding: 20px; */
  background: #e1dddd;
  border-radius: 50%;
  margin-right: 20px;
`;

const PostProfile = ({ avatar, title }) => {
  return (
    <ContentWrap>
      <Avatar>{avatar}</Avatar>
      <div>
        <h2>{title}</h2>
      </div>
    </ContentWrap>
  );
};

export default PostProfile;
