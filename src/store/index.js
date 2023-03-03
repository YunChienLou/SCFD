import { createStore } from "vuex";
import { loginUser } from "../firebase";
import firebase from "firebase/app";
import ServerAPI from "../firebase";
import router from "../router";

const store = createStore({
  state: {
    isAdmin: false,
    token: null,
    name: null,
    unit: null,
    emtlevel: null,
    rank: null,
    uid: null,
    notification: [],
  },

  mutations: {
    setUserData(state, payload) {
      state.name = payload.name;
      state.unit = payload.unit;
      state.emtlevel = payload.emtlevel;
      state.rank = payload.rank;
    },
    setUserToken(state, payload) {
      state.token = payload;
    },
    setUserId(state, payload) {
      state.uid = payload;
    },
    setIsAdmin(state, payload) {
      state.isAdmin = payload;
    },
    setNotification(state, payload) {
      state.notification.length = 0;
      state.notification.push(payload);
    },
  },

  getters: {
    getUnit: (state) => state.unit,
    getToken: (state) => state.token,
    getUid: (state) => state.uid,
    getIsAdmin: (state) => state.isAdmin,
  },

  actions: {
    async getData(state) {
      return state.state.unit;
    },
    async login(context, { email, password }) {
      let user = loginUser(email, password);
      console.log("login action", user.uid);
      context.commit("setUser", null);
    },
    async logout(context) {
      console.log("logout action");
      let logoutUserData = {
        name: null,
        unit: null,
        emtlevel: null,
        rank: null,
      };
      context.commit("setUserData", logoutUserData);
      context.commit("setUserToken", null);
      context.commit("setUserId", null);
      context.commit("setIsAdmin", null);
    },
    async verify(context) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          context.commit("setUserId", user.uid);
          user.getIdToken().then(async (idToken) => {
            let data = {
              data: {
                token: idToken,
              },
            };
            let userData ={
              data:{
                token: idToken,
                uid:user.uid
              }
            }
            context.commit("setUserToken", idToken);
            ServerAPI.user.verifyUser(data, idToken).then((res) => {
              context.commit("setIsAdmin", res.data.result.result);
            });
            
            ServerAPI.user.getUser(userData, idToken).then((res) => {
              context.commit("setUserData", res.data.result.data);
            }).catch((err)=>{
              console.log("ServerAPI.user.getUser occurs an error : "+err)
            });
          });
        } else {
          console.log("無登入");
          router.push("/");
        }
      });
    },
    async push2Notification(context, msgObj) {
      context.commit("setNotification", msgObj);
    },
    // getToken(context){
    //   return new Promise((resolve, reject)=>{

    //   })
    // }
  },
});

export default store;
