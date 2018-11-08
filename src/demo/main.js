import Vue from "vue";
import Vuex from "vuex";
import vueCustomElement from "vue-custom-element";
import VueI18n from "vue-i18n";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import VeeValidate, { Validator } from "vee-validate";
import fr from "vee-validate/dist/locale/fr";

// import { VueColorPlugin, VueAerisLanguagePlugin } from "aeris-mixins";

import GmosCatalogueComponents from "../lib/modules/catalogue/components/gmos-catalogue-components.js";
import GmosMetadataComponents from "../lib/modules/metadata/components/gmos-metadata-components.js";

import GmosCatalogueStore from "../lib/modules/catalogue/store/gmos-catalogue-store.js";
import GmosMetadataStore from "../lib/modules/metadata/store/gmos-metadata-store.js";

import app from "./app.vue";
import GmosMetadataDownloadComponentTest from "./gmos-metadata-download-component-test.vue";
Vue.use(vueCustomElement);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VeeValidate);
Validator.localize("fr", fr);

// Vue.use(VueColorPlugin);
// Vue.use(VueAerisLanguagePlugin);

const store = new Vuex.Store({
  modules: {
    example: GmosCatalogueStore
  }
});

Vue.use(GmosCatalogueComponents, {
  store: store
});
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/metadata-download-path",
      component: GmosMetadataDownloadComponentTest
    }
  ]
});

new Vue({
  el: "#app",
  router,
  template: "<app/>",
  components: {
    app
  }
}).$mount("#app");
