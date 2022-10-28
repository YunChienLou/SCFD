import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
export default function useComp() {
  const store = useStore();
  const userData = {
    name: store.state.name,
    unit: store.state.unit,
    emtlevel: store.state.emtlevel,
    rank: store.state.rank,
  };
  const uid = store.state.uid;
  const adminMode = store.state.adminMode;
  const verifyVuex = async () => {
    await store.dispatch("verify");
  };

  onMounted(() => {
    verifyVuex();
    console.log("userState.js");
  });

  return {
    userData,
    uid,
    adminMode,
  };
}
