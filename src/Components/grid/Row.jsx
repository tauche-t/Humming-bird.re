import React from 'react';
import styled from 'styled-components';

const RowSpan = styled.div`
  display: flex;
  width: 100%;
`;

const Row = ({ children }) => {
  return (
    <RowSpan>{ children }</RowSpan>
  );
};

export default Row;
