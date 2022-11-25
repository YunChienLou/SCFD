<template>
  <div class="login container">
    <div class="row justify-content-center">
      <div class="col-md-6 my-5 text-center">
        <h2 class="heading-section">新北市救護義消<br />線上系統</h2>
      </div>
    </div>
    <img src="@/assets/unitLogo_whiteBg.png" class="img-fluid mb-5" alt="..." />
    <div class="row justify-content-center mb-5">
      <div class="col-md-7">
        <div class="login-wrap p-4">
          <div class="d-flex">
            <div class="w-100">
              <h2 class="mb-5">登入</h2>
            </div>
          </div>
          <form action="#" class="login-form" autocomplete="on">
            <div class="form-group mb-5">
              <div
                class="icon d-flex align-items-center justify-content-center"
              >
                <span class="fa fa-user"></span>
              </div>
              <input
                autocomplete="username"
                type="text"
                v-model="loginEmail"
                class="form-control rounded-left"
                placeholder="電子郵件"
                required
              />
            </div>
            <div class="form-group mb-5">
              <div
                class="icon d-flex align-items-center justify-content-center"
              >
                <span class="fa fa-lock"></span>
              </div>
              <input
                autocomplete="current-password"
                type="password"
                v-model="loginPassword"
                class="form-control rounded-left"
                placeholder="消民字號"
                required
              />
              <div class="form-group mb-5" id="loginErrSection"></div>
            </div>
            <div class="form-group d-flex align-items-center">
              <div class="w-100">
                <label class="checkbox-wrap checkbox-primary mb-0"
                  >忘記密碼?
                </label>
              </div>
              <div class="w-100 d-flex justify-content-end">
                <button
                  type="submit"
                  class="btn btn-primary rounded"
                  @click.prevent="loginUser(loginEmail, loginPassword)"
                >
                  確定
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginUser, forgetPasswords } from "@/firebase";

export default {
  name: "login",
  components: {},
  setup() {
    const loginEmail = "";
    const loginPassword = "";
    const forgetPassword = () => {
      forgetPasswords(loginEmail);
    };

    return {
      loginEmail,
      loginPassword,
      loginUser,
      forgetPassword,
    };
  },
};
</script>
<style scoped></style>
