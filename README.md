# Firebase + ReactJS ToDoList App

배포된 app : https://todo-list-react-93915.web.app/


**preview**

![image](https://user-images.githubusercontent.com/34260967/152685149-d2f7c60a-594e-453d-9860-67048ec6bc9a.png)

## firebsae

백엔드를 직접 구현하지 않고 firebase를 사용했습니다.

엄격한 모듈식 접근방법을 사용하는 웹 v9의 firebase를 적용하여 트리쉐이킹이 가능합니다.
(https://firebase.google.com/docs/web/learn-more#modular-version)

firebase/firestore 기능을 사용하여 데이터베이스를 구성했습니다.

firebase의 호스팅 서비스를 사용하여 호스팅 했습니다.

## firebase 시작하기

firestore app과 나의 프로젝트를 연결하기 위해 아래와 같은 절차를 진행했습니다.

firestore 시작하기 : https://firebase.google.com/docs/firestore/quickstart


### 1. firebase 프로젝트 생성, 로컬 프로젝트에 설치

firebase : https://firebase.google.com/

firebase 사이트에 로그인 후 `시작하기` 를 클릭하여 프로젝트를 생성합니다.

생성 후에는 아래화면에서 프로젝트에 앱을 등록해야합니다. 저는 web app 이기 때문에 `+앱 추가` 버튼을 눌러 web app 을 선택합니다.

![image](https://user-images.githubusercontent.com/34260967/152681617-cdf0fd43-3a57-4bf0-9bcc-35efb99e48d6.png)


다음과 같은 화면이 나타납니다.

![image](https://user-images.githubusercontent.com/34260967/152681711-8609f5e2-4f8c-4830-be73-acaf7aa90f26.png)

여기서 hosting 부분은 나중에 설정 가능하기 때문에 체크하지 않고 넘어갑니다. `앱 등록` 을 클릭합니다.

앱등록이 완료되었습니다. firebase의 SDK를 사용하기 위해 기본적인 프로젝트 정보와 코드가 예시로 나옵니다. 

![image](https://user-images.githubusercontent.com/34260967/152681971-6262e723-55d4-4795-b4aa-9d8e09ea8d82.png)

* 해당 앱은 테스트용으로 등록 후 삭제 되기 때문에 모든 정보를 가리지 않았습니다.

`npm 사용`을 체크하고 해당 코드를 복사합니다. 이는 나중에 다시 확인할 수 있습니다 복사하지 못하여도 괜찮습니다.

이제 안내에 따라 firebase를 설치합니다.

```
npm install --save firebase
```

그리고 `/src` 디렉토리에 `firebase.tsx` 파일을 생성하여 복사한 코드를 붙여넣어줍니다.

이 때, `firebase.tsx` 파일은 앱이 실행되기위해 꼭 필요한 파일입니다. 따라서 GitHub에 올리거나 배포 될때 같이 배포되기 때문에 apiKey, appId 등 중요한 정보는 노출시키지 않는것이 좋습니다. 저는 테스트 프로젝트이므로  완벽하진 않지만 `.env`파일을 활용한 환경변수를 이용하여 숨겼습니다.

**firebase.tsx**
```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
```

이렇게 firebase에서 생성한 app 객체를 가져왔습니다. app 객체를 이용하여 저의 프로젝트는 firebase와 연결될 것입니다.

### 2. firestore 연결 및 테이블 정의

app 객체를 가져온것 처럼 db 객체를 가져옵니다.

**firebase.tsx**
```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

firestore와 연결하여 데이터를 받을 수 있게되었습니다. 이제 firebase 사이트에서 데이터 테이블을 정의합니다.

이 프로젝트는 아래와 같은 데이터 구조를 가집니다.

- items
    - item1(random값)
        - check : boolean
        - date : string
        - timeStamp : number
        - content : string
    - item2(random값)
        - check
        - date
        - timeStamp
        - content
    - item3(random값)
        - ...
    - ...


firebase에서는 가장 상위 데이터단위를 `컬렉션`이라고 합니다. 컬렉션만 정의하고 나머지는 지금 당장 정의할 필요 없습니다. 참고하세요.

![image](https://user-images.githubusercontent.com/34260967/152502568-2a2a3a38-4208-49d9-a7c0-c083eebc77ce.png)

### 3. functions 정의

이제 firestore에 데이터를 읽고 쓰고 지우기 위한 함수를 정의해야합니다. 모든 함수는 공식문서를 참고하여 응용했습니다.

https://firebase.google.com/docs/firestore/quickstart

저는 `firebase.tsx`파일 내에 함수를 정의하고, 컴포넌트에 가져와서 사용했습니다.

#### read

하나의 컬렉션의 전체문서를 불러옵니다. 이 때 시간 순서대로 정렬하기위해 `orderBy` 키워드를 사용했습니다.

**input**
none

**output**
모든 아이템 객체가 포함된 객체
```
{
    A1V3CNDJC3E : {
        check : boolean
        content : string
        timeStamp : number
        date : string
    },
    ESJCSDJV2VD : {
        check : boolean
        content : string
        timeStamp : number
        date : string
    },
    ...
}
```

**code**

```javascript

import { orderBy, getDoc, collection, query } from "firebase/firestore";

interface InterfaceQsnap {
  [index: string]: any;
  id?: string;
  data?: () => any;
}

export const getQuerySnapShot = () => {
  const q = query(collection(db, "items"), orderBy("timeStamp"));
  const querySnapshot = async () => {
    return await getDocs(q);
  };

  const qsnap = querySnapshot().then((qsnapshot) => {
    let result: InterfaceQsnap = {};
    qsnapshot.forEach((doc) => {
      result[doc.id] = doc.data();
    });
    return result;
  });
  return qsnap;
};

```


#### create

특정 클렉션에 하나의 문서를 생성합니다.

**input**
```
{
    check : boolean
    content : string
    timeStamp : number
    date : string
}
```
**output** 
A1V3CNDJC3E   (랜덤한 docId)


**code**

```javascript
import { addDoc, collection, query } from "firebase/firestore";

interface IaddNewDocProps {
  [index: string]: any;
  content: string;
  date: string;
  check: boolean;
  timeStamp : number;
}
export const addNewDoc = (object: IaddNewDocProps, index: number) => {
  const data = object;
  
  /* ID 자동 랜덤 지정 문서 추가*/
  const writeDoc = async () => {
    const docRef = await addDoc(collection(db, "items"), data);
    return docRef.id;
  };

  const docId = writeDoc()
  return docId;
};
```

#### delete

컬렉션의 하나의 문서를 삭제합니다. 이 때 문서의 이름은 모두 랜덤하게 설정을 했음으로, 필드값을 비교하여 삭제합니다. `date`와 `content`가 정확하게 일치하는 문서를 삭제합니다.

```javascript
import { where, query, collection, getDocs, deleteDoc } from "firebase/firestore";

interface IdeleteItemProps {
  content: string;
  date: string;
}

export const deleteItemDoc = (props: IdeleteItemProps) => {
  const q = query(
    collection(db, "items"),
    where("content", "==", props.content),
    where("date", "==", props.date)
  );

  const getDocsFunc = async () => {
    return await getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        delDocsFunc(doc);
      });
    });
  };

  const delDocsFunc = async (doc: any) => {
    await deleteDoc(doc.ref);
  };

  return getDocsFunc();
};

```


## firebase/hosting

호스팅을 하기위해 아래의 절차를 진행했습니다.

