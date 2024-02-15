import "./input.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import { createApp } from "vue";
import App from "./App.vue";
import Store from "./stores.js";
import Router from "./router/index";


const app = createApp(App);
app.use(Router).use(Store).mount("#app");
