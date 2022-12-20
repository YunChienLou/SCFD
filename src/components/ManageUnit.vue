<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="h1 mt-3">管理分隊成員</div>
    <div class="mt-3 me-4">
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop2"
      >
        + 新增成員
      </button>
    </div>
  </div>
  <div class="d-flex align-items-center justify-content-center">
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
          <th scope="col">級職</th>
          <th scope="col">emt</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ user.name }}</td>
          <td>{{ user.rank }}</td>
          <td>{{ user.emtlevel }}</td>
          <td>
            <!-- Button trigger modal -->
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#editUserModal"
              @click="getUserData(user.id, index)"
            >
              修改
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleUser(user.id)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

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
            <div class="mb-3">
              <label class="form-label">E-mail</label>
              <input
                type="text"
                class="form-control"
                id="create"
                placeholder="請輸入 email .."
                v-model="create.email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                required
              />
              <div class="valid-feedback feedback-pos">Looks good!</div>
              <div class="invalid-feedback feedback-pos">
                Please input valid email ID
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">密碼</label>
              <input
                type="password"
                class="form-control"
                placeholder="請輸入 密碼 .."
                id="create2"
                v-model="create.passwords"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">級職</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                v-model="create.rank"
                placeholder="請輸入 級職 .."
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">EMT</label>
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="create.emtlevel"
                required
              >
                <option selected>請選擇</option>
                <option>T1</option>
                <option>T2</option>
                <option>TP</option>
              </select>
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
            :disabled="
              create.passwords == '' ||
              create.emtlevel == '' ||
              create.name == '' ||
              create.email == '' ||
              create.rank == ''
            "
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
            <div class="mb-3">
              <label class="form-label">級職</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword2"
                v-model="rankInput"
                required
              />
            </div>
            <div class="mb-3">
              <label class="form-label">EMT</label>
              <select
                class="form-select"
                aria-label="Default select example"
                v-model="emtInput"
                required
              >
                <option selected>請選擇</option>
                <option>T1</option>
                <option>T2</option>
                <option>TP</option>
              </select>
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
import { reactive, ref } from "@vue/reactivity";
import { computed, inject, onMounted, watch } from "@vue/runtime-core";
// import firebase from "firebase/app";
// import router from "../router";
import { useStore } from "vuex";
export default {
  setup() {
    const users = ref([]);
    const store = useStore();
    const unit = computed(() => {
      return store.state.unit;
    });
    const $UserAPI = inject("$UserAPI");

    //編輯個別user需要資料
    const targetUserId = ref("");
    const nameInput = ref("");
    const rankInput = ref("");
    const emtInput = ref("");

    // const uid = reactive({ uid: "" });
    const token = ref("");
    // const adminMode = ref(false);
    const passwordVerifie = ref(false);
    const isLoading = ref(false);
    const create = reactive({
      name: "",
      unit: "",
      emtlevel: "",
      rank: "",
      email: "",
      passwords: "",
      token: "",
    });

    const tokenVuex = computed(() => {
      return store.state.token;
    });
    const unitVuex = computed(() => {
      return store.state.unit;
    });

    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     isLoading.value = true;
    //     uid.uid = user.uid;
    //     user.getIdToken().then((idToken) => {
    //       console.log(idToken);
    //       let data = {
    //         data: {
    //           token: idToken,
    //           unit: unit.value,
    //         },
    //       };
    //       token.value = idToken;
    //       $UserAPI.verifyUser(data, token.value).then((res) => {
    //         adminMode.value = res.data.result.result;
    //       });
    //       $UserAPI
    //         .getUsers(data, token.value)
    //         .then((res) => {
    //           let filterArray = res.data.result.data.filter((el) => {
    //             return el.rank != "承辦警消";
    //           });
    //           users.value = filterArray;
    //           isLoading.value = false;
    //         })
    //         .catch((err) => {
    //           alert(err);
    //         });
    //     });
    //   } else {
    //     console.log("無登入");
    //     router.push("/");
    //   }
    // });

    const loadUsers = () => {
      isLoading.value = true;
      let data = {
            data: {
              token: tokenVuex.value,
              unit: unitVuex.value,
            },
          };
      $UserAPI
        .getUsers(data, tokenVuex.value)
        .then((res) => {
          let filterArray = res.data.result.data.filter((el) => {
            return el.rank != "承辦警消";
          });
          users.value = filterArray;
          isLoading.value = false;
        })
        .catch((err) => {
          alert(err);
        });
    };

    // 修改用的
    const getUserData = (uid, index) => {
      let user = users.value[index];
      targetUserId.value = uid;
      nameInput.value = user.name;
      emtInput.value = user.emtlevel;
      rankInput.value = user.rank;
    };

    const addUser = async () => {
      isLoading.value = true;
      let data = {
        data: {
          name: create.name,
          rank: create.rank,
          emtlevel: create.emtlevel,
          unit: unit.value,
          email: create.email,
          password: create.passwords,
          token: token.value,
        },
      };
      $UserAPI
        .createUser(data, token.value)
        .then(() => {
          $UserAPI.getUsers(data, token.value).then((res) => {
            users.value = res.data.result.data;
            isLoading.value = false;
          });
        })
        .catch((err) => {
          alert("操作錯誤 : " + err);
          isLoading.value = false;
        });
      create.name = "";
      create.email = "";
      create.passwords = "";
      create.emtlevel = "";
      create.rank = "";
    };

    const editUser = () => {
      isLoading.value = true;
      let data = {
        data: {
          userId: targetUserId.value,
          name: nameInput.value,
          rank: rankInput.value,
          emtlevel: emtInput.value,
          unit: unit.value,
          token: token.value,
        },
      };
      $UserAPI
        .updateUser(data, token.value)
        .then((res) => {
          console.log(res.data.result.result);
          $UserAPI.getUsers(data, token.value).then((res) => {
            users.value = res.data.result.data;
            isLoading.value = false;
          });
        })
        .catch((err) => {
          alert(err);
        });
    };

    const deleUser = (id) => {
      isLoading.value = true;
      let data = { data: { uid: id, token: token.value } };
      console.log("received data ", data);
      $UserAPI
        .deleteUser(data, token.value)
        .then((res) => {
          let data = {
            data: {
              token: token.value,
              unit: unit.value,
            },
          };
          console.log(res.data.result.result);
          $UserAPI.getUsers(data, token.value).then((res) => {
            users.value = res.data.result.data;
            isLoading.value = false;
          });
        })
        .catch((err) => {
          alert(err);
        });
    };

    watch(unitVuex, () => {
      console.log("watcher",tokenVuex.value)
      loadUsers()
    });

    onMounted(() => {
      loadUsers()
    });
    return {
      users,
      create,
      nameInput,
      rankInput,
      emtInput,
      targetUserId,
      passwordVerifie,
      isLoading,
      getUserData,
      editUser,
      deleUser,
      addUser,
    };
  },
};
</script>

<style></style>
