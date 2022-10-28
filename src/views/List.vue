<template>
  <div style="height: 100px"></div>
  <CaseList class="mx-3" />
</template>
<script>
import CaseList from "../components/CaseList.vue";

export default {
  name: "List",
  components: {
    CaseList,
  },
  setup() {},
};
</script>
<style scoped>
template {
  z-index: 2;
  opacity: 0.5;
}
</style>
