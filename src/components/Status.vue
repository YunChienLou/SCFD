<template>
  <nav class="navbar navbar-dark transBg2">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold">救護義消系統</a>
      <span>{{ userData.name }} {{ userData.rank }}</span>
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
        <div class="navbar-nav text-end">
          <li class="nav-item p-3">
            <router-link
              class="text-decoration-none text-white fw-bold fs-4"
              to="/homepage"
              >填寫紀錄表</router-link
            >
          </li>
          <!-- <li class="nav-item">
            <router-link to="/dashboard">區域統計表</router-link>
          </li> -->
          <li class="nav-item p-3">
            <router-link
              class="text-decoration-none text-white fw-bold fs-4"
              to="/list"
              >即時救護案件</router-link
            >
          </li>
          <li class="nav-item p-3">
            <router-link
              class="text-decoration-none text-white fw-bold fs-4"
              to="/dashboard"
              >區域統計表</router-link
            >
          </li>
          <li class="nav-item p-3">
            <router-link
              class="text-decoration-none text-white fw-bold fs-4"
              to="/search"
              >案件查詢</router-link
            >
          </li>
          <!-- !!!!! dynamic router!!!! -->
          <li class="nav-item p-3">
            <router-link
              class="text-decoration-none text-white fw-bold fs-4"
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
  setup() {},
};
</script>
<style>
.navbar {
  z-index: 3;
}
.transBg2 {
  background: linear-gradient(
    240deg,
    rgba(108, 117, 125, 1),
    rgba(108, 117, 125, 0)
  );
}
</style>
