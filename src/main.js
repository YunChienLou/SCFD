import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { dateFormate } from "./mixin/formator";
import ServerAPI from "./firebase";

const app = createApp(App);
app.provide("dateFormate", dateFormate);
app.use(router);
app.provide("$UserAPI", ServerAPI.user);
app.mount("#app");
