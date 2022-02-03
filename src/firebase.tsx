// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { deleteDoc, getFirestore, QuerySnapshot } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import { addDoc, setDoc, where } from "firebase/firestore";
import { resolve } from "node:path/win32";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATA_BASEURL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export default app;

export const analytics = getAnalytics(app);
export const db = getFirestore(app);

// async function getCities(db) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
//}

//하나의 문서 가져오기
export const getDocSnap = () => {
  const docName = "list-item";
  const docRef = doc(db, "items", docName);
  const getDocSnap2 = async () => {
    return await getDoc(docRef);
  };
  const docSnap = getDocSnap2().then((dsnap) => {
    if (dsnap.exists()) {
      // console.log("Document data:", dsnap.data());
      return dsnap;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return dsnap;
    }
  });
  return docSnap;
};

// 전체문서가져오기
interface InterfaceQsnap {
  [index: string]: any;
  id?: string;
  data?: () => any;
}

export const getQuerySnapShot = () => {
  const q = query(collection(db, "items"));
  const getQuerySnapshot2 = async () => {
    return await getDocs(q);
  };

  const qsnap = getQuerySnapshot2().then((qsnapshot) => {
    let result: InterfaceQsnap = {};
    qsnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      result[doc.id] = doc.data();
    });
    return result;
  });
  return qsnap;
};

// 문서 추가하기

interface IaddNewDocProps {
  [index: string]: any;
  content: string;
  date: string;
  check: boolean;
}
export const addNewDoc = (object: IaddNewDocProps, index: number) => {
  const data = object;
  const writeDoc = async () => {
    // console.log(_content, _date, _check)
    const docRef = await addDoc(collection(db, "items"), data);
    // console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  };

  // const writeDoc2 = async () => {
  //   const docRef2 = await setDoc(
  //     doc(db, "items", "item" + index.toString()),
  //     data
  //   );
  //   return docRef2;
  // };

  // const docRef2 = writeDoc2();

  const docId = writeDoc();

  return docId;
};

//문서 삭제하기
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
