<template>
  <div style="height: 100px"></div>
  <div class="admin">
    <ul class="nav nav-tabs mt-3">
      <li class="nav-item">
        <router-link class="nav-link text-white" to="/admin">首頁</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-white" to="/admin/memberList"
          >分隊成員</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-white" to="/admin/editFireFighters"
          >警消成員</router-link
        >
      </li>
      <li class="nav-item">
        <router-link class="nav-link text-white" to="/admin/openNewUnit"
          >開新分隊</router-link
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
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import { useRoute } from "vue-router";
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
// import router from "../router";
import { useStore } from "vuex";

export default {
  name: "Home",
  components: {
    // Status,
    // Footer,
  },
  setup() {
    const userData = reactive({
      name: computed(() => {
        return store.state.name;
      }),
      rank: computed(() => {
        return store.state.rank;
      }),
      emtlevel: computed(() => {
        return store.state.emtlevel;
      }),
      unit: computed(() => {
        return store.state.unit;
      }),
    });
    const uid = computed(() => {
      return store.state.uid;
    });
    const store = useStore();
    const route = useRoute();
    const url = computed(() => {
      return route.path;
    });

    const verifyVuex = async () => {
      await store.dispatch("verify");
    };
    verifyVuex();

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
