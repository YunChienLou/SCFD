<template class="">
  <div class="bg-dark text-white mx-0 overflow-hidden">
    <div class="bg-filter" :data-text="uid"></div>
    <!-- 浮水印 -->
    <router-view />
    <!-- 內容 -->
  </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  data() {
    return {
      uid: "",
    };
  },
  methods: {
    loginCheck() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.uid = user.uid;
          console.log("引入資料");
        } else {
          console.log("無登入");
        }
      });
    },
    moreBg() {
      const target = document.querySelectorAll(".bg-filter");
      Array.from(target).forEach(function (el) {
        el.dataset.text = (el.dataset.text + " ").repeat(10);
      });
    },
  },
  mounted() {
    this.loginCheck();
  },
  updated() {
    this.moreBg();
  },
};
</script>
<style scoped>
.bg-filter {
  position: fixed;
  top: -15%;
  right: 20%;
  /* overflow: hidden; */
  z-index: 0;
}
.bg-filter::before {
  display: block;
  width: 150%;
  height: 150%;

  transform: rotate(60deg);
  content: attr(data-text);

  opacity: 0.3;
  line-height: 10rem;
  letter-spacing: 2px;
  color: rgb(216, 216, 216);
  font-size: 2rem;
}
</style>
