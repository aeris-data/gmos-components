<template>
<div>
  <aeris-catalog metadata-service="https://sedoo.aeris-data.fr/catalogue/rest/metadatarecette/" program="GMOS" cart-service="https://sedoo.aeris-data.fr/catalogue/rest/shoppingcart" cart-token="gmos" hidemap="true" criteria-header-icon-color="grey" criteria-background-color="#F5F5F5"
    criteria-content-primary-color="grey">
    <div slot="criteria">
      <gmos-catalogue-platform-search-criteria-component></gmos-catalogue-platform-search-criteria-component>
    </div>
    <div slot="buttons-criteria">
      <aeris-catalogue-help-button></aeris-catalogue-help-button>
      <aeris-catalogue-maximize-button></aeris-catalogue-maximize-button>
      <aeris-catalogue-reset-button></aeris-catalogue-reset-button>
      <aeris-catalogue-search-button></aeris-catalogue-search-button>
    </div>
  </aeris-catalog>
  <div slot="help">
    <aeris-catalog-help-content helpcookie="help-popup"></aeris-catalog-help-content>
  </div>
</div>
</template>

<script>
export default {
  created() {
    [
      'aeris-data/gmos-metadata-components-vjs@latest'
    ].forEach(component => {
      let script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('component', component);
      script.setAttribute('src', 'https://rawgit.com/aeris-data/aeris-component-loader/master/aerisComponentLoader.js');
      document.head.appendChild(script);
    });
  }
}
</script>