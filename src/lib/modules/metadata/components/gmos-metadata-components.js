import GmosMetadataDownloadComponent from "./gmos-metadata-download-component.vue";
import GmosMetadataLayoutComponent from "./gmos-metadata-layout-component.vue";
import HelperRegisterModule from "../../helper-register-module";

const tasksComponents = [
  {
    vueComponent: GmosMetadataDownloadComponent,
    isCustomElement: true
  },
  {
    vueComponent: GmosMetadataLayoutComponent,
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
