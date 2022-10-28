<template>
  <div style="height: 100px"></div>
  <div class="home">
    <SearchComponent />
  </div>
</template>

<script>
// @ is an alias to /src
// import Status from "../components/Status.vue";
// import Footer from "../components/Footer.vue";
import SearchComponent from "../components/SearchComponent.vue";

export default {
  name: "Home",
  components: {
    SearchComponent,
  },
  setup() {},
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
