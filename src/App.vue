<template>
  <div class="bg-dark text-white mx-0 overflow-hidden">
    <div class="bg-filter" :data-text="name"></div>
    <!-- 浮水印 -->
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-lg-6">
          <Status
            v-if="!isLoginPage"
            :uid="uid"
            :userData="userData"
          />
          <router-view />
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
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { reactive } from "@vue/reactivity";
import { computed, onUpdated } from "@vue/runtime-core";

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
    const name = computed(() => {
      return store.state.name;
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
        el.dataset.text = (el.dataset.text + " ").repeat(10);
      });
    };

    const verifyVuex = async () => {
      console.log("App");
      await store.dispatch("verify");
    };
    verifyVuex();
    onUpdated(() => {
      moreBg;
    });
    return {
      isLoginPage,
      userData,
      uid,
      name,
    };
  },
  // methods: {
  //   async loginCheck() {
  //     console.log("LoginStatus")
  //     await store.dispatch("verify");
  //   },
  //   moreBg() {
  //     const target = document.querySelectorAll(".bg-filter");
  //     Array.from(target).forEach(function (el) {
  //       el.dataset.text = (el.dataset.text + " ").repeat(10);
  //     });
  //   },
  // },
  // mounted() {
  //   this.loginCheck();
  // },
  // updated() {
  //   this.moreBg();
  // },
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
