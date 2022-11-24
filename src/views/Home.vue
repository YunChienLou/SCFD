<template>
  <div class="home mx-sm-5">
    <h1 class="text-center pt-3">
      <strong>救護紀錄表</strong>
    </h1>
    <CaseCreate />
  </div>
</template>

<script>
// @ is an alias to /src
import CaseCreate from "../components/CaseCreate.vue";

export default {
  name: "Home",
  components: {
    CaseCreate,
  },
  setup() {},
};
</script>
<style scoped>
.home {
  opacity: 0.8;
}
</style>
