// import GmosCatalogueComponent from "./gmos-catalogue-component.vue";
// import TaskEditComponent from "./task-edit-component.vue";
// import TaskListComponent from "./task-list-component.vue";
// import HelperRegisterModule from "../../helper-register-module";

// const tasksComponents = [
//   {
//     vueComponent: GmosCatalogueComponent,
//     isCustomElement: true
//   },
//   {
//     vueComponent: TaskEditComponent,
//     isCustomElement: true
//   },
//   {
//     vueComponent: TaskListComponent,
//     isCustomElement: true
//   }
// ];

// export default {
//   install: (Vue, options) => {
//     if (!window.registredAerisElements) {
//       window.registredAerisElements = [];
//     }

//     let timer = setInterval(function() {
//       if (
//         window.registredAerisElements.indexOf("aeris-commons-components-vjs") >
//         -1
//       ) {
//         Vue.use(tasksComponents, {
//           store: options.store
//         });
//         HelperRegisterModule.registerStore(options.store, tasksComponents);
//         HelperRegisterModule.registerVueComponents(Vue, tasksComponents);
//         HelperRegisterModule.registerCustomElements(Vue, tasksComponents);

//         clearInterval(timer);
//       }
//     }, 1000);
//   }
// };