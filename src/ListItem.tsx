import { useState } from "react";
import { useCallback } from "react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  getDocSnap,
  getQuerySnapShot,
  addNewDoc,
  deleteItemDoc,
} from "./firebase";

//styled

const ItemWrapper = styled.div`
  position: relative;
  width: 100%;
  border: none;

  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  border-radius : 6px;
  background-color : white;

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
  font-size : 2rem;
`;
const InputContentBox = styled(InputDateBox)``;

const AddButton = styled.button`
  font-size : 4rem;
  background-color : #e5e5e5;
  border : none;
  margin : 1rem 0;
  cursor : pointer;
  &:hover{
    border : 1px solid black;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 0rem;
  top: 0rem;

  background-color: transparent;
  width: 2rem;
  height: 2rem;
  font-size: 24px;
  border: none;
  cursor : pointer;
  &:active {
    background-color: #e7e7e7;
  }
`;

const NoItemBox = styled.div`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin: 4rem 0;
`;

const LoadingBox = styled.div`
  font-size: 2rem;
  text-align : center;
  margin : 5rem 0;
`;

//interface
interface interfaceItem {
  [index: string]: any;
  content?: string;
  date?: string;
  check?: boolean;
}
interface Idata {
  content: string;
  date: string;
}

const ListItem = () => {
  const [items, setItems] = useState<interfaceItem>({});
  const [content, setContent] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getDate = useCallback(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const today = year + "-" + month + "-" + day;
    return today;
  }, []);

  useEffect(() => {
    getQuerySnapShot().then((qsnap) => {
      setItemIndex(Object.keys(qsnap).length);
      setItems({ ...qsnap });
      setIsLoading(false);
    });
  }, [refreshCount]);

  useEffect(() => {}, []);

  const addItem = () => {
    addNewDoc(
      {
        content: content,
        date: getDate(),
        check: check,
        timeStamp : Date.now(),
      },
      itemIndex
    )
      .then(() => {
        alert("입력 완료.");
        clearInput();
      })
      .catch(() => {
        alert("오류 발생.");
      });
  };

  const deleteItem = async (props: Idata) => {
    // firebase.tsx 에 삭제함수 추가
    await deleteItemDoc(props)
      .then(() => {
        alert("삭제 완료");
        setRefreshCount((count) => count + 1);
        setIsLoading(true);
      })
      .catch(() => {
        alert("삭제 중 오류 발생");
      });
  };

  const clearInput = () => {
    setContent("");
    setRefreshCount((count) => count + 1);
    setIsLoading(true);
  };

  const addButtonClickHandler = () => {
    addItem();
  };

  const deleteButtonClickHandler = (data: Idata) => {
    deleteItem(data);
  };

  const changeHandler = (e: any) => {
    setContent(e.target.value);
  };

  const renderItems = () => {
    const itemsLength = Object.keys(items).length;
    if (itemsLength > 0) {
      return Object.keys(items).map((item: any, index: number) => (
        <ItemWrapper key={index}>
          <DateBox>{items[item].date}</DateBox>
          <ContentBox>{items[item].content}</ContentBox>
          <DeleteButton
            onClick={() => {
              deleteButtonClickHandler({
                date: items[item].date,
                content: items[item].content,
              });
            }}
          >
            X
          </DeleteButton>
        </ItemWrapper>
      ));
    } else {
      return <NoItemBox>아이템이 없습니다. 아래에서 추가해주세요.</NoItemBox>;
    }
  };

  const renderAddItem = () => {
    return (
      <AddItemWrapper>
        <DateBox>{getDate()}</DateBox>
        <InputContentBox
          type="text"
          placeholder="Input Content"
          onChange={changeHandler}
          value={content}
        />
        <AddButton onClick={addButtonClickHandler}>+</AddButton>
      </AddItemWrapper>
    );
  };

  return isLoading ? (
    <LoadingBox> Loading ... </LoadingBox>
  ) : (
    <div>
      {renderItems()}
      {renderAddItem()}
    </div>
  );
};

// 아이템 삭제
// 아이템 없어도 모양 유지
// 아이템 추가
// 등등 생각

export default ListItem;
