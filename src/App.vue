<template>
  <div class="bg-dark text-white mx-0 overflow-hidden">
    <!-- 浮水印 -->
    <div class="container">
      <div v-if="!isLoginPage" class="bg-filter" :data-text="name"></div>
      <div class="row d-flex justify-content-center">
        <div class="col-lg-6">
          <Status v-if="!isLoginPage" :uid="uid" :userData="userData" />
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
import { computed, onMounted, onUpdated } from "@vue/runtime-core";

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

    onUpdated(() => {
      console.log("onUpdated");
      moreBg();
    });
    
    onMounted(()=>{
      verifyVuex();
    })

    return {
      isLoginPage,
      userData,
      uid,
      name,
    };
  },
};
</script>
<style scoped>
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
  z-index: -2;
  opacity: 0.3;
  line-height: 10rem;
  letter-spacing: 2px;
  color: rgb(216, 216, 216);
  font-size: 2rem;
}
</style>
