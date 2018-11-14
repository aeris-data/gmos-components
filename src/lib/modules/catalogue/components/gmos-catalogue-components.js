import GmosCataloguePlatformSearchCriteriaComponent from "./criteria/gmos-catalogue-platform-search-criteria-component.vue";
import GmosThesaurusItemTreeCheckboxLayoutComponent from "./criteria/gmos-thesaurus-item-tree-checkbox-layout-component.vue";
import GmosPlatformSearchCriateriaDeprecatedComponentTest from "./criteria/gmos-platform-search-criteria-content-deprecated-component.vue";
import HelperRegisterModule from "../../helper-register-module";

const tasksComponents = [
  {
    vueComponent: GmosCataloguePlatformSearchCriteriaComponent,
    isCustomElement: true
  },
  {
    vueComponent: GmosThesaurusItemTreeCheckboxLayoutComponent,
    isCustomElement: true
  },
  {
    vueComponent: GmosPlatformSearchCriateriaDeprecatedComponentTest,
    isCustomElement: true
  }
];

export default {
  install: (Vue, options) => {
    if (!window.registredAerisElements) {
      window.registredAerisElements = [];
    }

    let timer = setInterval(function() {
      if (
        window.registredAerisElements.indexOf("aeris-commons-components-vjs") >
        -1
      ) {
        Vue.use(tasksComponents, {
          store: options.store
        });
        HelperRegisterModule.registerStore(options.store, tasksComponents);
        HelperRegisterModule.registerVueComponents(Vue, tasksComponents);
        HelperRegisterModule.registerCustomElements(Vue, tasksComponents);

        clearInterval(timer);
      }
    }, 1000);
  }
};
