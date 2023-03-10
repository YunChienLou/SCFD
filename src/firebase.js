import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
// import { ref, onUnmounted } from "vue";
import router from "./router";
require("firebase/firestore");
require("firebase/functions");
const urlBase = "https://asia-east1-scfd-app.cloudfunctions.net/";

const query = {
  queryTargetCases: (data, token) => {
    return axios.post(urlBase + "queryTargetCases", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  queryOtherContentCases: (data, token) => {
    return axios.post(urlBase + "queryOtherContentCases", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  queryTimePeriodCases: (data, token) => {
    return axios.post(urlBase + "queryTimePeriodCases", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
};
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
  getUser: (data, token) => {
    return axios.post(urlBase + "getUser", data, {
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

const report = {
  getReports: (data, token) => {
    return axios.post(urlBase + "getReports", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
};

const cases = {
  createCase: (data, token) => {
    return axios.post(urlBase + "createCase", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  updateCase: (data, token) => {
    return axios.post(urlBase + "updateCase", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  deleteCase: (data, token) => {
    return axios.post(urlBase + "deleteCase", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  getCase: (data, token) => {
    return axios.post(urlBase + "getCase", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  getCases: (data, token) => {
    return axios.post(urlBase + "getCases", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
};
export default { user, firefighter, admin, report, cases, query };

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
// const functions = firebaseApp.functions("asia-east1");
const db = firebaseApp.firestore();
const dailyCases = db.collection("cases");
// const users = db.collection("users");
// const orderCases = dailyCases.orderBy("time", "desc").limit(15);
const auth = firebase.auth();

// export const loadCasesTarget = async (subject, value) => {
//   const snapshot = dailyCases
//     .orderBy("time", "desc")
//     .where(subject, "==", value)
//     .get();
//   return snapshot;
// };

// export const loadCasesByTimePeriod = async (start, end) => {
//   var targetCases = [];
//   const snapshot = await dailyCases
//     .orderBy("time", "desc")
//     .where("time", ">=", start)
//     .where("time", "<", end)
//     .get();

//   snapshot.forEach((doc) => {
//     targetCases.push({
//       id: doc.id,
//       time: doc.data().time,
//       unit: doc.data().unit,
//       emtlevel: doc.data().emtlevel,
//       who: doc.data().who,
//       uid: doc.data().uid,
//       rank: doc.data().rank,
//       patient: doc.data().patient,
//       onScene: doc.data().onScene,
//       treatment: doc.data().treatment,
//       selectedParts: doc.data().selectedParts,
//       vital: doc.data().vital,
//       tp: doc.data().tp,
//       location: doc.data().location,
//       otherContent: doc.data().otherContent,
//       hospital: doc.data().hospital,
//     });
//   });
//   return targetCases;
// };

// export const loadUnitCasesByTimePeriod = async (start, end, unit) => {
//   var targetCases = [];
//   const snapshot = await dailyCases
//     .orderBy("time", "asc")
//     .where("unit", "==", unit)
//     .where("time", ">=", start)
//     .where("time", "<", end)
//     .get();

//   snapshot.forEach((doc) => {
//     targetCases.push({
//       id: doc.id,
//       time: doc.data().time,
//       unit: doc.data().unit,
//       emtlevel: doc.data().emtlevel,
//       who: doc.data().who,
//       uid: doc.data().uid,
//       rank: doc.data().rank,
//       patient: doc.data().patient,
//       onScene: doc.data().onScene,
//       treatment: doc.data().treatment,
//       selectedParts: doc.data().selectedParts,
//       vital: doc.data().vital,
//       tp: doc.data().tp,
//       location: doc.data().location,
//       otherContent: doc.data().otherContent,
//       hospital: doc.data().hospital,
//     });
//   });
//   return targetCases;
// };

// export const loadOtherContentCases = async (value) => {
//   var targetCases = [];
//   // 記錄們(每個以物件為單位) 存放的陣列
//   const snapshot = await dailyCases.orderBy("time", "desc").get();
//   snapshot.forEach((item) => {
//     if (item.data().otherContent?.indexOf(value) >= 0) {
//       targetCases.push(item.data());
//     }
//   });
//   return targetCases;
//   // 最後回傳收繳資料的矩陣
// };
// 這支還沒用過
export const loadSpecArrayCases = async (subject, value) => {
  var targetCases = [];
  // 記錄們(每個以物件為單位) 存放的陣列
  const snapshot = await dailyCases
    .where(subject, "array-contains", value)
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

// 登出邏輯
export const logoutUser = () => {
  auth.signOut().then(() => {
    console.log("user log out !!!");
    router.push("/");
  });
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

