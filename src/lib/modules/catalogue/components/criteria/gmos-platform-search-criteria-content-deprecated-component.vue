<template>
<div data-aeris-platform-search-criteria-content>
  <aeris-tree-checkbox-layout type="plateforms" name="Platform" name-subitems="platforms"></aeris-tree-checkbox-layout>
</div>
</template>

<script>
export default {
	name: 'aeris-platform-search-criteria-content',
  props: {
    lang: {
      type: String,
      default: 'en'
    }
  },
  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },
  destroyed: function() {
    document.removeEventListener('aerisPlatformDownloadResponse', this.handlePlatformResponseListener);
    this.handlePlatformDowloadListener = null;
  },
  created: function() {
  },
  mounted: function() {
    console.log('Aeris platform search criteria content - created');
    this.$i18n.locale = this.lang;
    this.handlePlatformResponseListener = this.handlePlatformResponse.bind(this);
    document.addEventListener('aerisPlatformDownloadResponse', this.handlePlatformResponseListener);
  },
  data() {
    return {
      handlePlatformResponseListener: null
    }
  },
  updated: function() {},
  methods: {
    handlePlatformResponse: function(e) {
      document.dispatchEvent(new CustomEvent('aerisPlatformItemsEvent', {
        detail: {
          items: e.detail.items
            .filter(item => this.parsedExclusions ? !this.parsedExclusions.some(itemToExclude => item.name == itemToExclude) : true)
            .filter(item => this.parsedInclusions ? this.parsedInclusions.some(itemToInclude => item.name == itemToInclude) : true)
            .map(item => {
              return {
                checked: false,
                deployed: false,
                name: item.name,
              }
            })
        }
      }));
    }
  }
}
</script>