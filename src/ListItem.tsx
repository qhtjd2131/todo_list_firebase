import { QuerySnapshot } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { getDocSnap, getQuerySnapShot } from "./firebase";

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


interface interfaceItem {
  [index : string] : any;
  content? : string;
  date? : string;
  check? : boolean;
}
const ListItem = () => {
  const [items, setItems] = useState<interfaceItem>({});

  useEffect(() => {
    // const a = getDocSnap();
    // console.log("a : ", a);

    // const b = getQuerySnapShot();
    // console.log("b : ", b);

    getQuerySnapShot().then((qsnap) => {
      setItems({...qsnap});
      console.log("qsnap:", qsnap)
      console.log(Object.keys(qsnap))
    });
  }, []);

  return (
    <div>
      {Object.keys(items).map((item: any, index: number) => (
        <ItemWrapper key={index}>
          <DateBox>{items[item].date}</DateBox>
          <ContentBox>{items[item].content}</ContentBox>
        </ItemWrapper>
      ))}
      {console.log("items:", items)}
    </div>
  );
};

export default ListItem;
