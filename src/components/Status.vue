<template>
  <nav class="navbar fixed-top navbar-dark navBg2">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold">救護義消系統</a>
      <span>{{ userData.unit }} {{ userData.name }} {{ userData.rank }}</span>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarNavAltMarkup"
        style="height: 90vh"
      >
        <div class="navbar-nav text-center mt-5 fs-5" style="height: 80vh">
          <div class="row" style="font-size: 1.3rem; height: 30%">
            <div
              class="col-6 d-flex justify-content-center align-items-center align-middle"
              style="background: #ffcd35"
              @click="
                () => {
                  router.push('/homepage');
                  closeNav();
                }
              "
            >
              <li class="nav-item p-3">
                <router-link
                  class="text-decoration-none nav-link text-white fw-bold"
                  to="/homepage"
                  >填寫紀錄表</router-link
                >
              </li>
            </div>
            <div
              class="col-6 d-flex justify-content-center align-items-center"
              style="background: #eddf6b"
              @click="
                () => {
                  router.push('/list');
                  closeNav();
                }
              "
            >
              <li class="nav-item p-3">
                <router-link
                  class="text-decoration-none nav-link text-white fw-bold"
                  to="/list"
                  >即時救護案件</router-link
                >
              </li>
            </div>
          </div>
          <div class="row" style="font-size: 1.3rem; height: 30%">
            <div
              class="col-6 d-flex justify-content-center align-items-center"
              style="background: #002c7f"
              @click="
                () => {
                  router.push('/dashboard');
                  closeNav();
                }
              "
            >
              <li class="nav-item p-3">
                <router-link
                  class="text-decoration-none nav-link text-white fw-bold"
                  to="/dashboard"
                  >計分表</router-link
                >
              </li>
            </div>
            <div
              class="col-6 d-flex justify-content-center align-items-center"
              style="background: #00659f"
              @click="
                () => {
                  router.push('/search');
                  closeNav();
                }
              "
            >
              <li class="nav-item p-3">
                <router-link
                  class="text-decoration-none nav-link text-white fw-bold"
                  to="/search"
                  >案件查詢</router-link
                >
              </li>
            </div>
          </div>
          <div
            class="row"
            style="font-size: 1.3rem; height: 30%"
            @click="
              () => {
                router.push(`/loginstatus/${uid}`);
                closeNav();
              }
            "
          >
            <div
              class="col d-flex justify-content-center align-items-center justify-content-center"
              style="background: #00b3c5"
            >
              <li class="p-3">
                <router-link
                  class="text-decoration-none nav-link text-white fw-bold"
                  :to="`/loginstatus/${uid}`"
                  >個人資料</router-link
                >
              </li>
            </div>
          </div>
          <!-- <li class="nav-item p-3" >
            <router-link
              class="text-decoration-none text-white fw-bold fs-4"
              to="/homepage"
              >填寫紀錄表</router-link
            >
          </li>
          <li class="nav-item p-3" @click="closeNav()">
            <router-link
              class="text-decoration-none nav-link text-white fw-bold fs-4"
              to="/list"
              >即時救護案件</router-link
            >
          </li>
          <li class="nav-item p-3" @click="closeNav()">
            <router-link
              class="text-decoration-none nav-link text-white fw-bold fs-4"
              to="/dashboard"
              >計分表</router-link
            >
          </li>
          <li class="nav-item p-3" @click="closeNav()">
            <router-link
              class="text-decoration-none nav-link text-white fw-bold fs-4"
              to="/search"
              >案件查詢</router-link
            >
          </li>
          <li class="nav-item p-3" @click="closeNav()">
            <router-link
              class="text-decoration-none nav-link text-white fw-bold fs-4"
              :to="`/loginstatus/${uid}`"
              >個人資料</router-link
            >
          </li> -->
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  props: {
    uid: String,
    userData: Object,
  },
  setup() {
    const router = useRouter();
    const closeNav = () => {
      const nav = document.getElementById("navbarNavAltMarkup");
      nav.classList.remove("show");
    };
    return { closeNav, router };
  },
};
</script>
<style>
.navbar {
  z-index: 3;
}
.navBg2 {
  /* background: linear-gradient(
    110deg,
    rgba(108, 117, 125, 1),
    rgba(0, 53, 107, 0.5)
  ); */
  background-color: #212121;
  border-bottom: rgb(13, 110, 253) 3px solid;
  box-shadow: 0px 6px 30px 5px rgba(13, 109, 253, 0.614);
}
</style>
