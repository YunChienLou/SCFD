<template>
  <Status :uid="uid.uid" :userData="userData" />
  <div style="height: 100px"></div>
  <div class="home">
    <SearchComponent />
  </div>
  <Footer />
</template>

<script>
// @ is an alias to /src
import Status from "../components/Status.vue";
import Footer from "../components/Footer.vue";
import SearchComponent from "../components/SearchComponent.vue";

import { loadUser } from "@/firebase";
import { reactive } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import firebase from "firebase/app";
import router from "../router";

export default {
  name: "Home",
  components: {
    Status,
    SearchComponent,
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
<style scoped>
.home {
  opacity: 0.8;
}
#Search {
  z-index: 3 !important;
}
</style>
