import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import { ref, onUnmounted } from "vue";
import router from "./router";
require("firebase/firestore");
require("firebase/functions");
const urlBase = "https://asia-east1-scfd-app.cloudfunctions.net/";

const user = {
  createUser: (data, token) => {
    return axios.post(urlBase + "createUser", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  getUsers: (data, token) => {
    return axios.post(urlBase + "getUsers", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  deleteUser: (data, token) => {
    return axios.post(urlBase + "deleteUser", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  updateUser: (data, token) => {
    return axios.post(urlBase + "updateUser", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  verifyUser: (data, token) => {
    return axios.post(urlBase + "verifyAdmin", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
};

const firefighter = {
  createFirefighter: (data, token) => {
    return axios.post(urlBase + "createFirefighter", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  getFirefighters: (data, token) => {
    return axios.post(urlBase + "getFirefighters", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  deleteFirefighter: (data, token) => {
    return axios.post(urlBase + "deleteFirefighter", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  updateFirefighter: (data, token) => {
    return axios.post(urlBase + "updateFirefighter", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
};

const admin = {
  getAdmins: (data, token) => {
    return axios.post(urlBase + "getAdmins", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  createAdmin: (data, token) => {
    return axios.post(urlBase + "createAdmin", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
};
export default { user, firefighter, admin };

// 即將廢除 改 axios post method call api
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
const functions = firebaseApp.functions("asia-east1");
const db = firebaseApp.firestore();
const dailyCases = db.collection("cases");
const users = db.collection("users");
const orderCases = dailyCases.orderBy("time", "desc").limit(15);
const auth = firebase.auth();

// Cloud Function test

// add doc to firebase collection
export const createCase = (Case) => {
  return dailyCases
    .add(Case)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert("上傳成功");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      alert("上傳失敗");
    });
};

// get specific doc that match id
export const getCase = async (id) => {
  const Case = await dailyCases.doc(id).get();
  return Case.exists ? Case.data() : null;
};

export const getUser = async (id) => {
  const User = await users.doc(id).get();
  return User.exists ? User.data() : null;
};

export const updateCases = (id, Case) => {
  return dailyCases
    .doc(id)
    .update(Case)
    .then((docRef) => {
      console.log("Document updating with ID: ", docRef);
      alert("更新成功");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
      alert("更新失敗");
    });
};

export const updateUser = (id, User) => {
  return users.doc(id).update(User);
};

export const deleteCase = async (id) => {
  var deleteBoolean = confirm("確認刪除?");
  if (deleteBoolean) {
    await dailyCases
      .doc(id)
      .delete()
      .then((msg) => {
        console.log(msg);
        alert("刪除成功");
      })
      .catch((error) => {
        console.log(error);
        alert("刪除失敗");
      });
    // refresh route to origin page
    return router.go();
  }
};

export const deleteUser = async (id) => {
  var deleteBoolean = confirm("確認刪除?");
  var deleteUser2 = functions.httpsCallable("deleteUser");
  if (deleteBoolean) {
    users.doc(id).delete();
    await deleteUser2({ uid: id }).then((result) => {
      console.log("User delete successfully", result);
    });
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
  onUnmounted(close);
  return cases;
};

//load whole collection in
export const useLoadUsers = () => {
  const cases = ref([]);
  const close = users.onSnapshot((snapshot) => {
    cases.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return cases;
};

// export const loadCasesTarget = (subject, value) => {
//   var targetCases = [];
//   // 記錄們(每個以物件為單位) 存放的陣列
//   dailyCases
//     .orderBy("time", "desc")
//     .where(subject, "==", value)
//     .onSnapshot((snapshot) => {
//       snapshot.forEach((doc) => {
//         // targetCases.push({ id: doc.id, ...doc.data() });
//         targetCases.push({
//           id: doc.id,
// time: doc.data().time,
// unit: doc.data().unit,
// emtlevel: doc.data().emtlevel,
// who: doc.data().who,
// uid: doc.data().uid,
// rank: doc.data().rank,
// patient: doc.data().patient,
// onScene: doc.data().onScene,
// treatment: doc.data().treatment,
// selectedParts: doc.data().selectedParts,
// vital: doc.data().vital,
// tp: doc.data().tp,
// location: doc.data().location,
// otherContent: doc.data().otherContent,
// hospital: doc.data().hospital,
//         });
//       });
//       // 連上後端資料庫
//       // 由時間排序 由先排到後
//       // 找資料庫中 指定科目 == 指定值 的資料
//       // snapshot 選到的多筆資料(陣列)
//       // forEach跑回圈
//       // 每次回圈取陣列中的一筆資料(doc)
//       // 以物件{id:xxx,name:xxx,rank:xxx, ....}
//       // 的物件型態 PUSH 回
//       // targetCases(存放的陣列)
//     });
//   //delete close when Unmounted
//   // console.log(
//   //   "載入結果符合 " + subject + " = " + value + " 的病例",
//   //   targetCases
//   // );
//   console.log("loadCasesTarget" , targetCases)
//   return targetCases;
//   // 最後回傳收繳資料的矩陣
// };

export const loadCasesTarget = async (subject, value) => {
  const snapshot = dailyCases
    .orderBy("time", "desc")
    .where(subject, "==", value)
    .get();
  return snapshot;
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
  console.log(targetCases);
  return targetCases;
};

export const loadUnitCasesByTimePeriod = async (start, end, unit) => {
  var targetCases = [];
  const snapshot = await dailyCases
    .orderBy("time", "desc")
    .where("time", ">=", start)
    .where("time", "<", end)
    .where("unit", "==", unit)
    .get();

  snapshot.forEach((doc) => {
    targetCases.push({
      id: doc.id,
      time: doc.data().time,
      unit: doc.data().unit,
      emtlevel: doc.data().emtlevel,
      who: doc.data().who,
      uid: doc.data().uid,
      rank: doc.data().rank,
      patient: doc.data().patient,
      onScene: doc.data().onScene,
      treatment: doc.data().treatment,
      selectedParts: doc.data().selectedParts,
      vital: doc.data().vital,
      tp: doc.data().tp,
      location: doc.data().location,
      otherContent: doc.data().otherContent,
      hospital: doc.data().hospital,
    });
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
      router.push(`/loginstatus/${cred.user.uid}`);
      return cred.user;
    })
    .catch((err) => {
      var loginErrSection = document.getElementById("loginErrSection");
      loginErrSection.innerHTML =
        '<div class="alert alert-danger mt-3">' + err.message + "</div>";
      console.log(err.message);
    });
};

// Auth before api calls

export const verifyIsAdmin = (idToken) => {
  var verifyAdmin = functions.httpsCallable("verifyAdmin");
  return verifyAdmin({ token: idToken });
};

// 登出邏輯
export const logoutUser = () => {
  auth.signOut().then(() => {
    console.log("user log out !!!");
    router.push("/");
  });
};

// 創建帳號
var secondaryApp = firebase.initializeApp(config, "Secondary");
export const createUser = async (User) => {
  let data = {
    name: User.name,
    emtlevel: User.emtlevel,
    rank: User.rank,
    unit: "三重",
  };
  let uid;
  await secondaryApp
    .auth()
    .createUserWithEmailAndPassword(User.email, User.passwords)
    .then((user) => {
      uid = user.user.uid;
      console.log("Successfully create", user, uid);
      secondaryApp.auth().signOut();
    })
    .catch(() => {
      console.log("fail create");
    });
  users.doc(uid).set(data);
};

//忘記密碼
export const forgetPasswords = (email) => {
  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent!
      // ..
      console.log("Password reset email sent!");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("errorCode : ", errorCode, "errorMessage :", errorMessage);
      // ..
    });
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
  return output;
};

//  警消名單載入
export const loadFirefighters = () => {
  const firefighters = ref([]);
  const close = db.collection("firefighters").onSnapshot((snapshot) => {
    firefighters.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(close);
  return firefighters;
};

export const loadFirefightersByUnit = async (unit) => {
  const firefighters = [];
  const unitId = await getCollectionId(unit);

  const snapshot = await db
    .collection(unit + "/" + unitId + "/firefighters")
    .get();
  snapshot.forEach((doc) => {
    if (Object.keys(doc.data()) != 0) {
      firefighters.push({ id: doc.id, ...doc.data() });
    }
  });
  return firefighters.length > 0 ? firefighters : null;
};

export const createFirefightersByUnit = () => {};

const getCollectionId = async (collection_name) => {
  var id;
  await db
    .collection(collection_name)
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        id = doc.id;
      });
    });
  return id;
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

// page refresh
