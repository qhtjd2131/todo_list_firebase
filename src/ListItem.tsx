import { useState } from "react";
import { useCallback } from "react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { getDocSnap, getQuerySnapShot, addNewDoc } from "./firebase";

//styled

const ItemWrapper = styled.div`
position : relative;
  width: 100%;
  border: 1px solid black;
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`;
const DateBox = styled.div`
  margin-bottom: 0.5rem;
`;

const ContentBox = styled.div`
  font-size: 22px;
  font-weight: 600;
`;

const AddItemWrapper = styled(ItemWrapper)``;

const InputDateBox = styled.input`
  height: 2rem;
`;
const InputContentBox = styled(InputDateBox)``;

const AddButton = styled.button``;

const DeleteButton = styled.button`
  position : absolute;
  right : 0rem;
  top : 0rem;

  background-color : transparent;
  width : 2rem;
  height : 2rem;
  font-size : 24px;
  border : none;
  &:active {
    background-color : #e7e7e7;
  }
`;
//


interface interfaceItem {
  [index: string]: any;
  content?: string;
  date?: string;
  check?: boolean;
}
const ListItem = () => {
  const [items, setItems] = useState<interfaceItem>({});
  const [content, setContent] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState(0);
  
  const getDate = useCallback(() => {
    const date = new Date();
    const today =
      date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
    return today;
  },[]);

  useEffect(() => {
    getQuerySnapShot().then((qsnap) => {
      setItems({ ...qsnap });
    });
  }, [refreshCount]);

  const addItem = () => {
    addNewDoc({
      content: content,
      date: getDate(),
      check: check,
    })
      .then(() => {
        alert("입력 완료.");
        clearInput();
      })
      .catch(() => {
        alert("오류 발생.");
      });

  }

  const deleteItem = () => {
    // firebase.tsx 에 삭제함수 추가

  }

  const clearInput = () => {
    setContent("");
    setRefreshCount(count => count+1);
  };

  const addButtonClickHandler = () => {
   addItem();
  };
  
  const deleteButtonClickHandler =() => {
    deleteItem();
  }

  const changeHandler = (e: any) => {
    setContent(e.target.value);
  };

  return (
    <div>
      {Object.keys(items).map((item: any, index: number) => (
        <ItemWrapper key={index}>
          <DateBox>{items[item].date}</DateBox>
          <ContentBox>{items[item].content}</ContentBox>
          <DeleteButton onClick={deleteButtonClickHandler}>X</DeleteButton>
        </ItemWrapper>
      ))}

      <AddItemWrapper>
        <DateBox>{getDate()}</DateBox>
        <InputContentBox
          type="text"
          placeholder="Input Content"
          onChange={changeHandler}
          value={content}
        />
        <AddButton onClick={addButtonClickHandler}>Add</AddButton>
      </AddItemWrapper>
    </div>
  );
};

// 아이템 삭제

// 아이템 없어도 모양 유지

// 아이템 추가

// 등등 생각

export default ListItem;
