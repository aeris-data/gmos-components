import Vue from "vue";
import VueCustomElement from "vue-custom-element";
import Vuex from "vuex";
import VueI18n from "vue-i18n";
import VueResource from "vue-resource";
import VeeValidate, { Validator } from "vee-validate";
import fr from "vee-validate/dist/locale/fr";
import GmosMetadataComponents from "./components/gmos-metadata-components.js";

import GmosMetadataStore from "./store/gmos-metadata-store.js";

Vue.use(Vuex);
Vue.use(VueCustomElement);
Vue.use(VueI18n);
Vue.use(VueResource);
Vue.use(VeeValidate);
Validator.localize("fr", fr);

const store = new Vuex.Store({
  modules: {
    task: GmosMetadataStore
  }
});

Vue.use(GmosMetadataComponents, {
  store: store
});
