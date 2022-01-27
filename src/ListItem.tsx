import React from "react";
import styled from "styled-components";

//styled

const ItemWrapper = styled.div`
  width: 100%;

  border: 1px solid black;
  box-sizing: border-box;
  padding: 1rem;
`;
const DateBox = styled.div`
  margin-bottom: 0.5rem;
`;

const ContentBox = styled.div`
  font-size: 22px;
  font-weight: 600;
`;

const ListItem = () => {
  return (
    <ItemWrapper>
      <DateBox>date</DateBox>

      <ContentBox>content</ContentBox>
    </ItemWrapper>
  );
};

export default ListItem;
