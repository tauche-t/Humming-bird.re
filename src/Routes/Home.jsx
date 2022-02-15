import { useSelector } from "react-redux";
import styled from "styled-components";
import AppLayout from "../Components/AppLayout";
import PostCard from "../Components/PostCard";
import PostForm from "../Components/PostForm";

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
`;


const Home = () => {
  const { mainPosts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <AppLayout>
        <InputSearch type="search" placeholder="검색" />
        { user && <PostForm /> }
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
}

export default Home;