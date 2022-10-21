<template>
  <Status :uid="uid.uid" :userData="userData" />
  <div style="height: 100px"></div>
  <div class="admin">
    <ul class="nav nav-tabs mt-3">
      <li class="nav-item">
        <router-link class="nav-link text-white" to="/admin"
          >管理首頁</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-white" to="/admin/memberList"
          >管理分隊成員</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-white" to="/admin/editFireFighters"
          >管理警消成員</router-link
        >
      </li>
    </ul>
    <div class="card bg-secondary mt-5 mx-4" v-if="url == '/admin'">
      <div class="card-header">提醒 學長姊!!</div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>此為管理頁面，系統將會記錄各管理員，編輯資料的紀錄。</p>
          <p>請小心編輯!! 謝謝</p>
          <br />
          <footer class="blockquote-footer text-light">
            <cite title="Source Title">三重救護志工 羅云謙</cite>
          </footer>
        </blockquote>
      </div>
    </div>
    <router-view :userData="userData"></router-view>
  </div>
  <Footer />
</template>

<script>
// @ is an alias to /src
import Status from "../components/Status.vue";
import Footer from "../components/Footer.vue";
import { useRoute } from "vue-router";
import { loadUser } from "@/firebase";
import { reactive } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import firebase from "firebase/app";
import router from "../router";

export default {
  name: "Home",
  components: {
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

    const route = useRoute();
    const url = computed(() => {
      return route.path;
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
      url,
    };
  },
};
</script>
<style scoped>
.admin {
  opacity: 0.85;
  min-height: 90vh;
}
</style>
