import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import 'firestore-export-import';
// const { initializeFirebaseApp } = require("firestore-export-import");
// const serviceAccount = require("./util/serviceAccountKey.json");
// const appName = "SCFD_APP_EXPORT";
// initializeFirebaseApp(serviceAccount, appName);
// the appName & options are OPTIONAL
// you can initalize the app without them
// initializeFirebaseApp(serviceAccount)

const app = createApp(App);
app.use(router);
app.mount("#app");
