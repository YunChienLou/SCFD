<template>
  <div>
    <Status :uid="uid.uid" :userData="userData" />
    <h1 class="text-center pt-3">
      <strong>救護紀錄表</strong>
    </h1>
    <CaseCreate :uid="uid" :userData="userData" />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import CaseCreate from "../components/CaseCreate.vue";
import Status from "../components/Status.vue";
import Footer from "../components/Footer.vue";

import { loadUser } from "@/firebase";
import { reactive } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import firebase from "firebase/app";
import router from "../router";

export default {
  name: "Home",
  components: {
    CaseCreate,
    Status,
    Footer,
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
