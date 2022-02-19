import styled, { keyframes } from "styled-components";

const Animate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #d0ebff;
  border-bottom-color: #d0ebff;
  animation: ${Animate} 1s ease infinite;
  margin: 0 auto;
`;

const Loading = () => {
  return (
    <Spinner />
  );
}

export default Loading;
