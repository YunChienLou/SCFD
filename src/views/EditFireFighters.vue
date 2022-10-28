<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="h1 mt-3">管理警消成員</div>
    <div class="mt-3 me-4">
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop2"
      >
        + 新增警消
      </button>
    </div>
  </div>
  <div v-if="isLoading" class="text-center mt-5 text-white">
    <div class="h1 text-center">資料處理中 .....</div>
    <div
      class="spinner-border text-primary"
      style="width: 5rem; height: 5rem"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <table v-else class="table table-dark table-striped">
    <thead>
      <tr>
        <th scope="col">No.</th>
        <th scope="col">姓名</th>
        <!-- <th scope="col">級職</th>
        <th scope="col">emt</th> -->
        <th class="text-center me-3" scope="col">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in firefighters" :key="user.id">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ user.name }}</td>
        <!-- <td>{{ user.rank }}</td>
        <td>{{ user.emtlevel }}</td> -->
        <td class="text-end">
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-secondary me-1"
            data-bs-toggle="modal"
            data-bs-target="#editUserModal"
            @click="getUserData(index)"
          >
            修改
          </button>
          <button
            type="button"
            class="btn btn-danger me-3"
            @click="deleUser(user.id)"
          >
            刪除
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop2"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content text-dark">
        <div class="modal-header">
          <h2 class="modal-title fw-bold" id="staticBackdropLabel">新增成員</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="needs-validation" novalidate>
            <div class="mb-3">
              <label class="form-label">姓名</label>
              <input
                type="text"
                class="form-control"
                placeholder="請輸入 姓名 .."
                id="create.3"
                v-model="create.name"
                required
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            :disabled="create.name == ''"
            @click="addUser()"
          >
            新增
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal1 -->
  <div
    class="modal fade editUserModal"
    id="editUserModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content text-dark">
        <div class="modal-header">
          <h2 class="modal-title fw-bold" id="exampleModalLabel">修改資料</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="form-label">姓名</label>
              <input
                type="text"
                class="form-control"
                id="nameInput"
                aria-describedby="輸入姓名"
                v-model="nameInput"
                required
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="editUser()"
            data-bs-dismiss="modal"
          >
            儲存修改
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject, onMounted } from "@vue/runtime-core";
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { unitNameEnum } from "@/util/Enum";
export default {
  setup() {
    const store = useStore();
    const $FirefighterAPI = inject("$FirefighterAPI");
    const firefighters = ref([]);
    const isLoading = ref(false);
    const unitVuex = computed(() => {
      return store.state.unit;
    });
    const tokenVuex = computed(() => {
      return store.state.token;
    });
    // const testGetters = computed(
    //   () => store.getters["getUserData"]
    // );

    const verifyVuex = () => {
      return store.dispatch("verify");
    };

    const nameInput = ref("");
    const targetUserId = ref("");

    const passwordVerifie = ref(false);
    const create = reactive({
      name: "",
    });
    const afterGetUnit = () => {
      console.log("start execute afterGetUnit");
      isLoading.value = true;
      let unit = unitVuex.value;
      let enumValue = unitNameEnum[unit];
      let data = {
        data: {
          token: tokenVuex.value,
          unit: enumValue,
        },
      };
      console.log(data.data);
      $FirefighterAPI
        .getFirefighters(data, tokenVuex.value)
        .then((res) => {
          console.log(res);
          firefighters.value = res.data.result.data;
          isLoading.value = false;
        })
        .catch((err) => {
          console.log(err);
          failResponse(err);
        });
    };
    const failResponse = (err) => {
      isLoading.value = false;
      alert(err + ";\n通知三重志工 羅云謙  0919539740");
    };
    const getUserData = async (index) => {
      let target = JSON.parse(JSON.stringify(firefighters.value))[index];
      console.log(target, index);
      nameInput.value = target.name;
      targetUserId.value = target.id;
    };
    const addUser = async () => {
      isLoading.value = true;
      let data = {
        data: {
          name: create.name,
          unit: unitNameEnum[unitVuex.value],
          token: tokenVuex.value,
        },
      };
      console.log(data.data);
      $FirefighterAPI
        .createFirefighter(data, tokenVuex.value)
        .then((res) => {
          console.log(res);
          afterGetUnit();
        })
        .catch((err) => {
          console.log(err);
          failResponse(err);
        });
    };
    const editUser = () => {
      isLoading.value = true;
      let data = {
        data: {
          name: nameInput.value,
          token: tokenVuex.value,
          unit: unitNameEnum[unitVuex.value],
          userId: targetUserId.value,
        },
      };
      console.log(data.data, "update data");
      $FirefighterAPI
        .updateFirefighter(data, tokenVuex.value)
        .then((res) => {
          console.log(res);
          afterGetUnit();
        })
        .catch((err) => {
          console.log(err);
          failResponse(err);
        });
    };
    const deleUser = (id) => {
      isLoading.value = true;
      let data = {
        data: {
          uid: id,
          unit: unitNameEnum[unitVuex.value],
          token: tokenVuex.value,
        },
      };
      $FirefighterAPI
        .deleteFirefighter(data, tokenVuex.value)
        .then((res) => {
          console.log(res);
          afterGetUnit();
        })
        .catch((err) => {
          console.log(err);
          failResponse(err);
        });
    };
    verifyVuex();
    onMounted(() => {
      console.log("onMounted");
      if (unitVuex.value != null || tokenVuex.value != null) {
        afterGetUnit();
      }
    });
    return {
      store,
      create,
      isLoading,
      nameInput,
      targetUserId,
      passwordVerifie,
      firefighters,
      unitVuex,
      tokenVuex,
      getUserData,
      editUser,
      deleUser,
      addUser,
    };
  },
};
</script>

<style></style>
