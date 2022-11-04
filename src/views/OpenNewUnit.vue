<template>
  <div class="d-flex justify-content-between align-items-center my-3">
    <div class="h1 mb-0">管理員編組</div>
    <div class="">
      {{ unitCh }}
      <button
        class="btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        分隊
      </button>

      <ul class="dropdown-menu">
        <li
          class="text-center bg-dark text-white fs-4 py-3"
          @click="
            () => {
              unitCh = '淡水';
              unitEng = 'TamSui';
            }
          "
        >
          淡水
        </li>
        <li
          class="text-center bg-dark text-white fs-4 py-3"
          @click="
            () => {
              unitCh = '鷺江';
              unitEng = 'LuJiang';
            }
          "
        >
          鷺江
        </li>
        <li
          class="text-center bg-dark text-white fs-4 py-3"
          @click="
            () => {
              unitCh = '二重';
              unitEng = 'ErChong';
            }
          "
        >
          二重
        </li>
        <li
          class="text-center bg-dark text-white fs-4 py-3"
          @click="
            () => {
              unitCh = '龍源';
              unitEng = 'LongYuan';
            }
          "
        >
          龍源
        </li>
        <li
          class="text-center bg-dark text-white fs-4 py-3"
          @click="
            () => {
              unitCh = '竹圍';
              unitEng = 'ZuWei';
            }
          "
        >
          竹圍
        </li>
        <li
          class="text-center bg-dark text-white fs-4 py-3"
          @click="
            () => {
              unitCh = '蘆洲';
              unitEng = 'LuZhou';
            }
          "
        >
          蘆洲
        </li>
        <li
          class="text-center bg-dark text-white fs-4 py-3"
          @click="
            () => {
              unitCh = '三芝';
              unitEng = 'SanZhi';
            }
          "
        >
          三芝
        </li>
        <li
          class="text-center bg-dark text-white fs-4 py-3"
          @click="
            () => {
              unitCh = '滬尾';
              unitEng = 'HuWei';
            }
          "
        >
          滬尾
        </li>
      </ul>
    </div>
    <div class="">
      <button
        type="button"
        :disabled="unitCh == '' || unitEng == ''"
        class="btn btn-primary"
        @click="createAdmin()"
      >
        + 新增分隊
      </button>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table text-white table-responsive" style="width: 150%">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Last Sign In</th>
          <th scope="col">Create Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(admin, index) in admins" :key="admin.email">
          <th>{{ index + 1 }}</th>
          <td>{{ admin.email }}</td>
          <td>{{ admin.metadata.lastSignInTime }}</td>
          <td>{{ admin.metadata.creationTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed, inject, onMounted, watch } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const admins = ref([]);
    const $AdminAPI = inject("$AdminAPI");
    const unitCh = ref("");
    const unitEng = ref("");
    const tokenVuex = computed(() => {
      return store.state.token;
    });
    const verifyVuex = async () => {
      await store.dispatch("verify");
    };
    const getAdmins = () => {
      let data = {
        data: {
          token: tokenVuex.value,
        },
      };
      $AdminAPI.getAdmins(data, tokenVuex.value).then((res) => {
        admins.value = res.data.result.data;
      });
    };
    const createAdmin = () => {
      let data = {
        data: {
          token: tokenVuex.value,
          unitCh: unitCh.value,
          unitEng: unitEng.value,
        },
      };
      console.log(data.data, tokenVuex.value);
      $AdminAPI.createAdmin(data, tokenVuex.value).then((res) => {
        admins.value = res.data.result.data;
        console.log(res);
      });
    };
    watch(tokenVuex, getAdmins);
    onMounted(() => {
      verifyVuex();
      getAdmins();
    });
    return { admins, createAdmin, unitCh, unitEng };
  },
};
</script>

<style></style>
