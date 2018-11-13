<i18n>
{
  "en": {
    "platforms": "Platforms"
  },
  "fr": {
    "platforms": "Plateformes"
  }
}
</i18n>

<template>
<div data-aeris-platform-search-criteria>
  <aeris-catalog-search-box id="box" :title="$t('platforms')" header-icon-class="fa fa-rocket" :deployed="deployed">
    <gmos-thesaurus-item-tree-checkbox-layout-component type="platforms" name="Platform" name-subitems="platforms"></gmos-thesaurus-item-tree-checkbox-layout-component>
  </aeris-catalog-search-box>
</div>
</template>

<script>
export default {
  name: 'gmos-catalogue-platform-search-criteria-component',
  props: {
    lang: {
      type: String,
      default: 'en'
    },
    deployed: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },
  destroyed: function() {},
  created: function() {
    this.$i18n.locale = this.lang
  },
  mounted: function() {},
  computed: {
  },
  data() {
    return {}
  },
  updated: function() {},
  methods: {
  }
}
</script>

<style>
 </style>