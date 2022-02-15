import React from 'react';
import styled from 'styled-components';
import { Avatar } from './PostProfile';

const CommentList = styled.div`

  .commentHeader {
    padding: 20px 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #e1dddd;
  }

  ul li {
    margin-bottom: 15px;
    border-bottom: 1px solid #e9ecef;

    div {
      display: flex;
      align-items: center;
    }

    p {
      padding: 20px 10px;
    }
  }
`;

const CommentAvatar = styled(Avatar)`
  font-size: 16px;
  width: 50px;
  height: 50px;
`;

const Comments = ({ header, data }) => {
  return (
    <CommentList>
      <div className="commentHeader">{ header }</div>

      <ul>
        {data.map((post, index) => {
          return(
            <li>
              <div>
                <CommentAvatar>{ post.User.nickname[0] }</CommentAvatar>
                <h2>{ post.User.nickname }</h2>
              </div>
              <p>{ post.content }</p>
            </li>
          );
        })}
      </ul>
    </CommentList>
  );
};

export default Comments;
