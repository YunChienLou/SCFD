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
        + 新增成員
      </button>
    </div>
  </div>
  <table class="table table-dark table-striped">
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
            @click="getUserData(user.id)"
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
              <label class="form-label">請再輸入一次密碼</label>
              <input
                type="password"
                class="form-control"
                id="create."
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
            :disabled="create.passwords == '' || passwordVerifie.value == false"
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
import {
  deleteUser,
  updateUser,
  getUser,
  createUser,
  loadFirefightersByUnit,
} from "@/firebase";
import { reactive, ref } from "@vue/reactivity";
import { unitNameEnum } from "@/util/Enum";
import { watch } from "@vue/runtime-core";
export default {
  props: ["userData"],
  setup(props) {
    const firefighters = ref([]);
    const afterGetUnit = () => {
      let unit = props.userData.unit;
      let enumValue = unitNameEnum[unit];
      loadFirefightersByUnit(enumValue).then((list) => {
        firefighters.value = list;
      });
    };
    if (props.userData.unit != "") {
      afterGetUnit();
    }

    const nameInput = ref();
    const targetUserId = ref();
    const rankInput = ref();
    const emtInput = ref();

    const passwordVerifie = ref(false);
    const create = reactive({
      name: "",
      email: "",
      passwords: "",
      emtlevel: "",
      rank: "",
    });

    const getUserData = async (id) => {
      let data = await getUser(id);
      nameInput.value = data.name;
      rankInput.value = data.rank;
      emtInput.value = data.emtlevel;
      targetUserId.value = id;
    };
    const addUser = async () => {
      await createUser(create);
      create.name = "";
      create.email = "";
      create.passwords = "";
      create.emtlevel = "";
      create.rank = "";
    };
    const editUser = () => {
      let user = {
        name: nameInput.value,
        rank: rankInput.value,
        emtlevel: emtInput.value,
      };
      updateUser(targetUserId.value, user);
    };
    const deleUser = (id) => {
      deleteUser(id);
    };
    watch(props.userData, afterGetUnit);
    return {
      create,
      nameInput,
      rankInput,
      emtInput,
      targetUserId,
      passwordVerifie,
      firefighters,
      getUserData,
      editUser,
      deleUser,
      addUser,
    };
  },
};
</script>

<style></style>
