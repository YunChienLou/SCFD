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
        <i class="bi bi-list" style="font-size: 2rem"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav text-end mt-5">
          <li class="nav-item p-3" @click="closeNav()">
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
          </li>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  props: {
    uid: String,
    userData: Object,
  },
  setup() {
    const closeNav = () => {
      const nav = document.getElementById("navbarNavAltMarkup");
      nav.classList.remove("show");
    };
    return { closeNav };
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
