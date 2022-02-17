import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from './AppLayout';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../Reducer/post';

const Form = styled.form`
  margin-top: 10px;

  textarea {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #e1dddd;
  }
`;

const CommentButton = styled(Button)`
  margin: 0;
  margin-top: 10px;
  float: right;
`;

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const addCommentDone = useSelector((state) => state.user.addCommentDone);
  const id = user && user.id;

  const [commentText, onChangeCommentText, setComment] = useInput('');

  useEffect(() => {
    if(addCommentDone) {
      setComment('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback((e) => {
    e.preventDefault();
    setComment('');
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);

  return (
    <Form onSubmit={onSubmitComment}>
      <textarea value={commentText} onChange={onChangeCommentText}></textarea>
      <CommentButton type="submit">댓글</CommentButton>
    </Form>
  );
};

export default CommentForm;
