<template>
  <div class="bg-dark text-white mx-0 overflow-hidden">
    <div aria-live="polite" aria-atomic="false" class="fixed-top mt-5">
      <!-- Position it: -->
      <!-- - `.toast-container` for spacing between toasts -->
      <!-- - `.position-absolute`, `top-0` & `end-0` to position the toasts in the upper right corner -->
      <!-- - `.p-3` to prevent the toasts from sticking to the edge of the container  -->
      <div class="toast-container position-absolute top-0 end-0 p-3">
        <!-- Then put toasts within -->
        <div
          v-for="(no, index) in notifications"
          v-bind:key="index"
          class="toast bg-dark"
        >
          <div class="toast-header bg-secondary text-light">
            <div class="rounded me-2 bg-danger" alt="...">...</div>
            <strong class="me-auto">SCFD-APP</strong>
            <small class="text-light">{{ no.time }}</small>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div class="toast-body">{{ no.msg }}</div>
        </div>
      </div>
    </div>
    <!-- 浮水印 -->
    <div v-if="!isLoginPage" class="bg-filter" :data-text="name"></div>
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-lg-6">
          <Status v-if="!isLoginPage" :uid="uid" :userData="userData" />
          <div class="min-height">
            <router-view />
          </div>
          <Footer />
        </div>
      </div>
    </div>
    <!-- 內容 -->
  </div>
  
</template>

<script>
import Footer from "./components/Footer.vue";
import Status from "./components/Status.vue";
import { Toast } from "bootstrap";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { reactive } from "@vue/reactivity";
import { computed, onMounted, onUpdated, watch } from "@vue/runtime-core";

export default {
  components: {
    Footer,
    Status,
  },
  setup() {
    const route = useRoute();
    const isLoginPage = computed(() => {
      return ["Login"].indexOf(route.name) > -1;
    });
    const store = useStore();
    const notifications = computed(() => {
      console.log("compute notification");
      return store.state.notification;
    });
    const name = computed(() => {
      let identify =
        store.state.unit + "分隊 " + store.state.rank + " " + store.state.name;
      return identify;
    });
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

    const moreBg = () => {
      const target = document.querySelectorAll(".bg-filter");
      Array.from(target).forEach(function (el) {
        el.dataset.text = "";
        el.dataset.text = (name.value + " ").repeat(20);
      });
    };

    const verifyVuex = async () => {
      console.log("App");
      await store.dispatch("verify");
    };

    watch(notifications.value, () => {
      // var toast
      var toastElList = [].slice.call(document.querySelectorAll(".toast"));
      var toastList = toastElList.map(function (toastEl) {
        return new Toast(toastEl);
      });
      console.log("toastList", toastList);
      console.log("toastElList", toastElList);
      toastList.forEach((toast) => toast.show());
    });

    onUpdated(() => {
      console.log("onUpdated");
      moreBg();
    });

    onMounted(() => {
      verifyVuex();
    });

    return {
      isLoginPage,
      userData,
      uid,
      name,
      notifications,
    };
  },
};
</script>
<style scoped>
/* .modal-backdrop {
  z-index: -1 !important;
} */
.min-height {
  min-height: 80%;
}
.bg-filter {
  position: fixed;
  top: -60%;
  right: 40%;
  /* overflow: hidden; */
  z-index: 0;
}
.bg-filter::before {
  display: block;
  width: 250%;
  height: 50%;

  transform: rotate(60deg);
  content: attr(data-text);
  z-index: 0;
  opacity: 0.3;
  line-height: 10rem;
  letter-spacing: 2px;
  color: rgb(216, 216, 216);
  font-size: 2rem;
}
</style>
