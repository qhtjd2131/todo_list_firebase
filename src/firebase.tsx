// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  deleteDoc,
  getFirestore,
  orderBy,
  QuerySnapshot,
} from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import { addDoc, setDoc, where } from "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { timeStamp } from "console";

const googleProvider = new GoogleAuthProvider();

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

interface IgetQureySnapShot {
  [index: string]: any;
  uid: string;
}

export const getQuerySnapShot = ( uid : string) => {
  const q = query(collection(db, uid), orderBy("timeStamp"));
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
  timeStamp: number;
  uid : string;
}
export const addNewDoc = (object: IaddNewDocProps, index: number) => {
  const data = object;

  /* ID 자동 랜덤 지정 문서 추가*/
  const writeDoc = async () => {
    const fields = {
      content : object.content,
      date : object.date,
      check : object.check,
      timeStamp : object.timeStamp,
    }
    const docRef = await addDoc(collection(db, data.uid), fields);
    return docRef.id;
  };

  /* ID 지정 문서 추가 */
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
  timeStamp : number;
  uid : string;
}

export const deleteItemDoc = (props: IdeleteItemProps) => {
  const q = query(
    collection(db, props.uid),
    where("timeStamp", "==", props.timeStamp),
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

// 사용자 로그인 인증

const auth = getAuth();

export const getSignInWithPopup = () => {
  console.log("로그인팝업창생성");
  const loginData = signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential: any = GoogleAuthProvider.credentialFromResult(result);
      const token: string = credential.accessToken;
      // The signed-in user info.
      const user: any = result.user;
      // ...
      console.log("로그인 성공");
      return {
        user,
        token,
      };
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      alert(errorMessage + "\n" + credential);
    });

  return loginData;
};

// 로그인된 사용자 확인

export const getOnAuthChanged = () => {
  console.log("로그인된지 확인");
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      console.log("로그인된 유저는:", user);
      if (user) {
        console.log("user:", user);
        resolve({ user, token: "토큰을 구할방법 없을까" });
      } else {
        console.log("로그인된유저 없음");
        resolve(null);
      }
    });
  });
};

//로그아웃
export const excuteLogout = () => {
  console.log("로그아웃함수 실행");
  // googleProvider.setCustomParameters({
  //   prompt: 'select_account'
  // });

  return signOut(auth);
};
