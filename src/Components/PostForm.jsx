import { useRef } from "react";
import { useEffect } from "react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addPost } from "../Reducer/post";
import Loading from "./Loading"; 

const Form = styled.form`
  margin-top: 20px;

  textarea {
    width: 100%;
    border: 1px solid #e1dddd;
    padding: 5px 10px;
    box-sizing: border-box;
    height: 55px;
    border-radius: 3px;
    resize: none;

    &::placeholder {
      color: #e1dddd;
    }
  }

  .buttonWrap {
    margin: 10px 0 20px;

    &::after {
      content: "";
      display: block;
      clear: both;
    }

    .imgUpload {
      float: left;
      border-radius: 5px;
      width: auto;
      height: auto;
      padding: 5px 10px;
      border: 1px solid #a5d8ff;
      color: #a5d8ff;
      box-sizing: border-box;
      background: #fff;
    }

    .rightButton {
      float: right;
    }
  }
`;

const WriteButton = styled.button`
  width: auto;
  height: auto;
  padding: 5px 11px;
  border: 1px solid #a5d8ff;
  color: #a5d8ff;
  background: #fff;
  border-radius: 5px;
  margin-right: 1px;
  cursor: pointer;

  &:hover {
    background: #a5d8ff;
    color: #fff;
    transition: all 0.5s;
  }
`;

const PostForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [text, setText] = useState("");
  const { imagePaths } = useSelector((state) => state.post);
  const { addPostLoading } = useSelector((state) => state.post);
  const { addPostDone } = useSelector((state) => state.post);
  const { user } = useSelector(state => state.user);

  const [fileImage, setFileImage] = useState("");

  useEffect(() => {
    if(addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, [text]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    dispatch(addPost({ text: text, userId: user.id, nickname: user.nickname }));
  }, [text]);

  // const onClickImageUpLoad = useCallback((e) => {
  //   e.preventDefault();

  //   imageInput.current.click();
  // }, [imageInput.current]);


  return (
    <Form onSubmit={onSubmit}>
      <textarea value={text} onChange={onChangeText} maxLength={140} placeholder="????????? ???????????? ???????????????"></textarea>
      <div className="buttonWrap">
        {/* <input type="file" accept='image/*' name="file" multiple hidden ref={imageInput} /> */}
        {/* <Button onClick={onClickImageUpLoad} className="imgUpload" type="button">????????? ?????????</Button> */}
        <WriteButton type="submit" className="rightButton">{ addPostLoading ? <Loading /> : "??????" }</WriteButton>
      </div>
      {/* <div>
        {imagePaths.map((v) => (
          <div key={v}>
            <img src={v} alt={v} />
            <div>
              <button>??????</button>
            </div>
          </div>
        ))}
      </div> */}
    </Form>
  );
}

export default PostForm;