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
//import GmosMetadataComponents from "../lib/modules/metadata/components/gmos-metadata-components.js";

// import GmosCatalogueStore from "../lib/modules/catalogue/store/gmos-catalogue-store.js";
import GmosMetadataStore from "../lib/modules/metadata/store/gmos-metadata-store.js";

import app from "./app.vue";
import GmosMetadataDownloadComponentTest from "./gmos-metadata-download-component-test.vue";
import GmosMetadataLayoutComponentTest from "./gmos-metadata-layout-component-test.vue";
import GmosMetadataMdTemplateGmosTimeSeriesMetadataComponentTest from "./gmos-metadata-md-template-gmos-time-series-metadata-component-test.vue";
import GmosMetadataTimeSeriesMetadataSummaryComponentTest from "./gmos-metadata-time-series-metadata-summary-component-test.vue";
import GmosCatalogueComponentTest from "./gmos-catalogue-component-test.vue";
import GmosPlatformSearchCriateriaDeprecatedComponentTest from "./gmos-platform-search-criteria-content-deprecated-component-test.vue";

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
    example: GmosMetadataStore
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
    },
    {
      path: "/metadata-layout-path",
      component: GmosMetadataLayoutComponentTest
    },
    {
      path: "/metadata-md-template-gmos-time-series-metadata-path",
      component: GmosMetadataMdTemplateGmosTimeSeriesMetadataComponentTest
    },
    {
      path: "/metadata-time-series-metadata-summary-path",
      component: GmosMetadataTimeSeriesMetadataSummaryComponentTest
    },
    {
      path: "/catalogue-path",
      component: GmosCatalogueComponentTest
    },
    {
      path: "/platform-search-criteria-deprecated-path",
      component: GmosPlatformSearchCriateriaDeprecatedComponentTest
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
