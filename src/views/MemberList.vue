<template>
  <ManageUnit />
</template>

<script>
// @ is an alias to /src
import ManageUnit from "../components/ManageUnit.vue";

export default {
  name: "MemberList",
  components: {
    ManageUnit,
  },
  setup() {},
};
</script>
<style scoped>
.home {
  opacity: 0.8;
}
</style>
