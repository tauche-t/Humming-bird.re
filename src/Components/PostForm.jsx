import { useRef } from "react";
import { useEffect } from "react";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addPost } from "../Reducer/post";
import { Button } from "./AppLayout";

const Form = styled.form`
  margin-top: 20px;

  textarea {
    width: 100%;
    border: 1px solid #e1dddd;
    padding: 5px 10px;
    box-sizing: border-box;

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

const PostForm = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [text, setText] = useState("");
  const { imagePaths } = useSelector((state) => state.post);
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
      <textarea value={text} onChange={onChangeText} maxLength={140} placeholder="당신의 이야기를 적어주세요"></textarea>
      <div className="buttonWrap">
        {/* <input type="file" accept='image/*' name="file" multiple hidden ref={imageInput} /> */}
        {/* <Button onClick={onClickImageUpLoad} className="imgUpload" type="button">이미지 업로드</Button> */}
        <Button type="submit" className="rightButton">게시</Button>
      </div>
      {/* <div>
        {imagePaths.map((v) => (
          <div key={v}>
            <img src={v} alt={v} />
            <div>
              <button>제거</button>
            </div>
          </div>
        ))}
      </div> */}
    </Form>
  );
}

export default PostForm;