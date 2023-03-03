
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { dateFormate } from "./mixin/formator";
import ServerAPI from "./firebase";
import store from "./store/index";

import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap"

const app = createApp(App);
app.provide("dateFormate", dateFormate);
app.provide("$UserAPI", ServerAPI.user);
app.provide("$FirefighterAPI", ServerAPI.firefighter);
app.provide("$AdminAPI", ServerAPI.admin);
app.provide("$ReportAPI", ServerAPI.report);
app.provide("$CaseAPI", ServerAPI.cases);
app.provide("$QueryAPI", ServerAPI.query);
app.use(router);
app.use(store);

app.mount("#app");

