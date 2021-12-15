<template>
  <Status />

  <Footer />
</template>
<script>
import Status from "../components/Status.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Dashboard",
  components: {
    Footer,
    Status,
  },
  setup() {},
};
</script>
