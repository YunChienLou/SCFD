<template>
  <Status :uid="uid.uid" :userData="userData" />
  <CaseList />
  <Footer />
</template>
<script>
import CaseList from "../components/CaseList.vue";
import Footer from "../components/Footer.vue";
import Status from "../components/Status.vue";

import { reactive } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import firebase from "firebase/app";
import router from "../router";
import { loadUser } from "@/firebase";

export default {
  name: "List",

  components: {
    CaseList,
    Footer,
    Status,
  },

  setup() {
    const userData = reactive({
      name: "",
      rank: "",
      emtlevel: "",
      unit: "",
    });
    const uid = reactive({ uid: "" });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        uid.uid = user.uid;
        console.log("登入 帳號 : " + user.uid);
      } else {
        console.log("無登入");
        router.push("/");
      }
    });

    const forUserData = async () => {
      var user = await loadUser(uid.uid);
      userData.name = user.name;
      userData.rank = user.rank;
      userData.emtlevel = user.emtlevel;
      userData.unit = user.unit;
    };
    watch(uid, forUserData);

    return {
      userData,
      uid,
    };
  },
};
</script>
