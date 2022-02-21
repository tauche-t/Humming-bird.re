import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { REMOVE_POST_REQUEST } from "../Reducer/post";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineDelete } from 'react-icons/ai';
import PostProfile from "./PostProfile";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import { useSelector } from "react-redux";
import Loading from "./Loading";
// import PostImages from "./PostImages";

const PostWrap = styled.div`
  margin-bottom: 20px;
`;

const Card = styled.div`
  border: 1px solid #e1dddd;
  position: relative;
  border-radius: 10px;
`;

const ButtonSection = styled.div`
  float: right;
  margin-top: 10px;

  button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  button.likedButton {
    font-size: 24px;
    color: #74c0fc;
  }

  button.commentButton {
    font-size: 22px;
    color: #adb5bd;
  }
  
  button.deleteButton {
    font-size: 22px;
    color: #ffa8a8;
  }
`;

const PostContent = styled.p`
  padding: 30px;
`;

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState(false);

  const { removePostLoading } = useSelector(state => state.post);

  const { user } = useSelector(state => state.user);

  const onClickLiked = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onComment = useCallback(() => {
    setComment(prev => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if(user) {
      dispatch({
        type: REMOVE_POST_REQUEST,
        data: post.id,
      });
    }else{
      alert('로그인 해주세요~');
    }
  }, []);

  return (
    <PostWrap>
      <Card>

        {/* {post.Images[0] && <PostImages images={post.Images} />} */}

        <ButtonSection>
          <button onClick={onClickLiked} className="likedButton" >
            { liked ? <AiFillHeart style={{ color: '#fac7c7' }} /> : <AiOutlineHeart />}
          </button>
          <button onClick={onComment} className="commentButton">
            <AiOutlineMessage />
          </button>
          <button onClick={onRemovePost} className="deleteButton">
            <AiOutlineDelete />
          </button>
        </ButtonSection>

        <PostProfile avatar={post.User.nickname[0]} title={post.User.nickname} />

        <PostContent>{ post.content }</PostContent>
      </Card>
      { comment && (
        <div>
          { user ? <CommentForm post={post} /> : null }
          <Comments header={`${post.Comments.length}개의 댓글`} data={post.Comments} />
        </div>
      )}
    </PostWrap>
  );
}

export default PostCard;
