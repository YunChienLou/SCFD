import { createStore } from "vuex";
import { loginUser, loadUser } from "../firebase";
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
            context.commit("setUserToken", idToken);
            ServerAPI.user.verifyUser(data, idToken).then((res) => {
              context.commit("setIsAdmin", res.data.result.result);
            });
            var user = await loadUser(this.state.uid);
            context.commit("setUserData", user);
          });
        } else {
          console.log("無登入");
          router.push("/");
        }
      });
    },
  },
});

export default store;
