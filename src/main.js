import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import "./assests/styles.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@fortawesome/fontawesome-free/css/all.css";

const vuetify = createVuetify({
  components,
  directives,
});

import "@mdi/font/css/materialdesignicons.css";

export default createVuetify({
  icons: {
    defaultSet: "mdi",
  },
});

const pinia = createPinia();

createApp(App).use(vuetify).use(pinia).use(router).mount("#app");
