import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { getDocSnap, getQuerySnapShot, addNewDoc } from "./firebase";

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
  [index: string]: any;
  content?: string;
  date?: string;
  check?: boolean;
}
const ListItem = () => {
  const [items, setItems] = useState<interfaceItem>({});

  useEffect(() => {
    // const a = getDocSnap();
    // console.log("a : ", a);

    // const b = getQuerySnapShot();
    // console.log("b : ", b);

    getQuerySnapShot().then((qsnap) => {
      setItems({ ...qsnap });
      console.log("qsnap:", qsnap);
      console.log(Object.keys(qsnap));
    });
  }, []);

  const clickHandler = () => {
    console.log("click handler excuted");

    
    addNewDoc({
      content: "문서추가",
      date: "2020-02-02",
      check: false,
    });
  };

  return (
    <div>
      {Object.keys(items).map((item: any, index: number) => (
        <ItemWrapper key={index}>
          <DateBox>{items[item].date}</DateBox>
          <ContentBox>{items[item].content}</ContentBox>
        </ItemWrapper>
      ))}
      <button onClick={clickHandler}>add</button>
    </div>
  );
};

// 아이템 삭제

// 아이템 없어도 모양 유지

// 아이템 추가

// 등등 생각

export default ListItem;
