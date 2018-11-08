<i18n>
{
  "en": {
    "level": "Level",
    "details": "Details"
  },
  "fr": {
    "level": "Niveau",
    "details": "Détails"
  }
}
</i18n>
<template>

</template>

<script>
var marked = require('marked');
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    },
    maxLength: {
      type: Number,
      default: 2000
    },
    deployed: {
      type: Boolean,
      default: false
    },
    openIconClass: {
      type: String,
      default: 'fa fa-chevron-down'
    },
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    lang(value) {
      this.$i18n.locale = value
    }
  },
  destroyed: function() {
    document.removeEventListener('aerisTheme', this.aerisThemeListener);
    this.aerisThemeListener = null;
  },
  created: function() {
    console.log("gmos time serie summary - Creating");
    this.aerisThemeListener = this.handleTheme.bind(this)
    document.addEventListener('aerisTheme', this.aerisThemeListener);
  },
  mounted: function() {
    var event = new CustomEvent('aerisThemeRequest', {});
    document.dispatchEvent(event);
    if (this.lang) {
      this.$i18n.locale = this.lang
    }
  },
  computed: {
    title: function() {
      var aux = JSON.parse(this.value)
      if (aux.title) {
        return JSON.stringify(aux.title)
      } else {
        return "";
      }
    },
    uuid: function() {
      var aux = JSON.parse(this.value)
      if (aux.id) {
        var tmp = JSON.stringify(aux.id)
        return tmp.replace(/['"]+/g, '')
      } else {
        return "";
      }
    },
    description: function() {
      var aux = JSON.parse(this.value)
      if (aux.description) {
        var tmp = aux.description
        console.log(tmp)
        for (var item in tmp) {
          tmp[item] = marked(tmp[item])
        }
        return JSON.stringify(tmp)
      } else {
        return "";
      }
    },
    dataProcessingLevel: function() {
      var aux = JSON.parse(this.value)
      if (aux.dataProcessingLevel) {
        var tmp = JSON.stringify(aux.dataProcessingLevel);
        return tmp.replace(/L/gi, '').replace(/['"]+/g, '');
      } else {
        return "";
      }
    },
    headerIconClass: function() {
      var aux = JSON.parse(this.value)
      if (aux.plateformType) {
        return "aeris-icon aeris-icon-" + aux.plateformType
      } else {
        return "aeris-icon aeris-icon-unknown"
      }
    },
    type: function() {
      var aux = JSON.parse(this.value)
      if (aux.type) {
        return aux.type;
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      theme: null,
      aerisThemeListener: null,
      hasToolbar: false
    }
  },
  updated: function() {
    this.ensureTheme()
  },
  methods: {
    handleChevronClick: function() {
    },
    handleTheme: function(theme) {
      this.theme = theme.detail
      this.ensureTheme()
    },
    ensureTheme: function() {
      if (this.theme) {
        this.$el.querySelector("header .cartouche").style.background = this.theme.primary;
      }
    },
    displayDetails: function() {
      var event = new CustomEvent('aerisCatalogueDisplayMetadata', {
        detail: {
          type: this.type,
          uuid: this.uuid,
          title: this.title,
          iconClass: this.headerIconClass
        }
      });
      document.dispatchEvent(event);
    }
  }
}
</script>