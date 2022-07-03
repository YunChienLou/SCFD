import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { ref, onUnmounted } from "vue";
import router from "./router";

// var firebase = require("firebase/app");
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyDuwKHzRSvtY6sLJ5QIn6YeQgnnlChXx20",
  // 連上FIREBASE才知道連去哪一個專案
  authDomain: "scfd-app.firebaseapp.com",
  projectId: "scfd-app",
  storageBucket: "scfd-app.appspot.com",
  messagingSenderId: "642588500666",
  appId: "1:642588500666:web:5d7893ea746847bde31883",
};
const firebaseApp = firebase.initializeApp(config);
const db = firebaseApp.firestore();
const dailyCases = db.collection("cases");
const orderCases = dailyCases.orderBy("time", "desc").limit(15);

const auth = firebase.auth();

// add doc to firebase collection
export const createCase = (Case) => {
  return dailyCases.add(Case);
};

// get specific doc that match id
export const getCase = async (id) => {
  const Case = await dailyCases.doc(id).get();
  return Case.exists ? Case.data() : null;
};

export const updateCases = (id, Case) => {
  return dailyCases.doc(id).update(Case);
};

export const deleteCase = (id) => {
  var deleteBoolean = confirm("確認刪除?");
  if (deleteBoolean) {
    alert("成功刪除");
    console.log("刪除" + id);
    dailyCases.doc(id).delete();
    // refresh route to origin page
    return router.go();
  }
};

//load whole collection in
export const useLoadCases = () => {
  const cases = ref([]);
  const close = orderCases.onSnapshot((snapshot) => {
    cases.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  console.log("載入病例");
  onUnmounted(close);

  console.log(cases);
  return cases;
};

export const loadCasesTarget = (subject, value) => {
  var targetCases = [];
  // 記錄們(每個以物件為單位) 存放的陣列
  dailyCases
    .orderBy("time", "desc")
    .where(subject, "==", value)
    .onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        targetCases.push({ id: doc.id, ...doc.data() });
      });
      // 連上後端資料庫
      // 由時間排序 由先排到後
      // 找資料庫中 指定科目 == 指定值 的資料
      // snapshot 選到的多筆資料(陣列)
      // forEach跑回圈
      // 每次回圈取陣列中的一筆資料(doc)
      // 以物件{id:xxx,name:xxx,rank:xxx, ....}
      // 的物件型態 PUSH 回
      // targetCases(存放的陣列)
    });
  //delete close when Unmounted
  console.log("載入結果符合 " + subject + " = " + value + " 的病例");
  console.log(targetCases);
  return targetCases;
  // 最後回傳收繳資料的矩陣
};

export const loadWhoCases = async (value) => {
  var targetCases = [];
  const snapshot = await dailyCases.orderBy("time", "desc").get();
  snapshot.forEach((item) => {
    if (item.data().who.indexOf(value) >= 0) {
      targetCases.push(item.data());
    }
  });
  return targetCases;
};

export const loadUnitCases = async (value) => {
  var targetCases = [];
  const snapshot = await dailyCases
    .orderBy("time", "desc")
    .where("unit", "==", value)
    .get();
  snapshot.forEach((item) => {
    targetCases.push(item.data());
  });
  return targetCases;
};

export const loadOtherContentCases = async (value) => {
  var targetCases = [];
  // 記錄們(每個以物件為單位) 存放的陣列
  const snapshot = await dailyCases.orderBy("time", "desc").get();
  snapshot.forEach((item) => {
    if (item.data().otherContent?.indexOf(value) >= 0) {
      targetCases.push(item.data());
    }
  });
  return targetCases;
  // 最後回傳收繳資料的矩陣
};

export const loadSpecArrayCases = async (subject, value) => {
  var targetCases = [];
  // 記錄們(每個以物件為單位) 存放的陣列
  const snapshot = await dailyCases
    .where(subject, "array-contains", value)
    .get()
    .get();
  snapshot.docs.forEach((item) => {
    targetCases.push(item.data());
    targetCases.sort(function (a, b) {
      return new Date(b.time) - new Date(a.time);
    });
  });
  console.log(targetCases);
  return targetCases;
  // 最後回傳收繳資料的矩陣
};

// 登入邏輯

export const loginUser = (email, password) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      router.push("/loginstatus/" + cred.user.uid);
      console.log(cred.user.email + " has log in !!!");
    })
    .catch((err) => {
      var loginErrSection = document.getElementById("loginErrSection");
      loginErrSection.innerHTML =
        '<div class="alert alert-danger mt-3">' + err.message + "</div>";
      console.log(err.message);
    });
};
// 登出邏輯
export const logoutUser = () => {
  auth.signOut().then(() => {
    console.log("user log out !!!");
  });
  router.push("/");
};
// 載入用戶資料
export const loadUser = async (uid) => {
  var output = await db
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      var data = doc.data();
      return data;
    });
  console.log(output);
  return output;
};
//  警消名單載入
export const loadFirefighters = () => {
  // var output = await db
  //   .collection("firefighters")
  //   .get()
  //   .then((doc) => {
  //     console.log("firefighters",doc.docs)
  //     return doc;
  //   });
  // console.log(output);
  // return output;
  const firefighters = ref([]);
  const close = db.collection("firefighters").onSnapshot((snapshot) => {
    firefighters.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  console.log("載入警消名單");
  onUnmounted(close);

  console.log(firefighters);
  return firefighters;
};

// get uid
export const listenUserState = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("目前登入 帳號 : " + user.uid);
    } else {
      console.log("無登入");
      router.push("/");
    }
  });
};
