import { useCallback, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AppLayout from "../Components/AppLayout";
import PostCard from "../Components/PostCard";
import PostForm from "../Components/PostForm";
import { LOAD_POST_REQUEST, searchPostAction, SEARCH_POST_REQUEST } from "../Reducer/post";
import { LOAD_MY_INFO_REQUEST } from "../Reducer/user";

const SearchWrap = styled.div`
  position: relative;
`;

const InputSearch = styled.input`
  display: block;
  width: 100%;
  height: 35px;
  border-radius: 20px;
  border: 1px solid #fac7c7;
  background: #fbe0e0;
  padding: 0 40px;
  position: relative;
  margin-bottom: 30px;

  &:focus {
    /* border: 1px solid #fac7c7; */
    outline: 1px solid #fac7c7;
  }
`;


const Home = () => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state) => state.post);
  const { hasMorePost } = useSelector((state) => state.post);
  const { loadPostLoading } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  const loadMe = JSON.parse(localStorage.getItem("me"));

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
    });

    if(loadMe) {
      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
    }
  }, []);

  useEffect(() => {
    function onScroll() {
      if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if(hasMorePost && !loadPostLoading) {
          dispatch({
            type: LOAD_POST_REQUEST,
          });
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, []);

  const onChangeSearch = useCallback((e) => {
    setSearch(e.target.value);

  }, [search]);

  const onSubmitSearch = useCallback((e) => {
    e.preventDefault();

    dispatch(searchPostAction(search));
    if(search === '') {
      dispatch({
        type: LOAD_POST_REQUEST,
      });
    }
  }, [search]);

  return (
    <>
      <AppLayout>
        <SearchWrap>
          <form onSubmit={onSubmitSearch}>
            <InputSearch onChange={onChangeSearch} value={search} type="search" placeholder="검색" />
          </form>
          <AiOutlineSearch style={{ position: 'absolute', left: '12px', top: '9px', fontSize: '18px'  }} />
        </SearchWrap>
        { user && <PostForm /> }
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
}

export default Home;