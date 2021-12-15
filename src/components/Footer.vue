<template>
  <footer class="row footer text-center">
    <small class="m-0"
      >&copy; 版權所有 {{ currentYear }} 第三大隊 三重分隊 隊員 羅云謙.</small
    >
  </footer>
</template>

<script>
export default {
  setup() {
    var d = new Date();
    var currentYear = d.getFullYear();

    return {
      currentYear,
    };
  },
};
</script>
