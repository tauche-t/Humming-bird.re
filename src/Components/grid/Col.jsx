import React from 'react';
import styled from 'styled-components';

const ColSpan = styled.div`
  max-width: ${props => props.middleSpan ? (props.middleSpan / 12) * 100 : "8.33"}%;
  flex: 0 0 ${props => props.middleSpan ? (props.middleSpan / 12) * 100 : "8.33"}%;
  padding: 0 5px;
`;

const Col = ({ children, xs, md }) => {
  return (
    <ColSpan middleSpan={md} smallSpan={xs}>{ children }</ColSpan>
  );
};

export default Col;
