<template>
<div data-gmos-metadata-layout data-template="metadata-block">
  <header>
    <h3><i :class="icon"></i>{{title}}</h3>
    <div class="aeris-icon-group"></div>
  </header>
  <main>
    <slot></slot>
  </main>
</div>
</template>

<script>
export default {
  props: {
    lang: {
      type: String,
      default: 'en'
    },
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  mounted: function() {
    var event = new CustomEvent('aerisThemeRequest', {});
    document.dispatchEvent(event);
  },
  destroyed: function() {
    document.removeEventListener('aerisTheme', this.aerisThemeListener);
    this.aerisThemeListener = null;
  },
  created: function() {
    this.aerisThemeListener = this.handleTheme.bind(this);
    document.addEventListener('aerisTheme', this.aerisThemeListener);
  },
  updated: function() {
    this.ensureTheme();
  },
  data() {
    return {
      theme: null,
      aerisThemeListener: null,
      view: null
    }
  },
  methods: {
    handleTheme: function(event) {
      this.theme = event.detail;
      this.ensureTheme();
    },
    ensureTheme: function() {
      if (this.$el && this.$el.querySelector("header h3 i")) {
        this.$el.querySelector("header h3 i").style.color = this.theme.primary;
      }
      if (this.$el) {
    	  this.$el.style.backgroundColor = this.theme.emphasis;
      }
    }
  }
}
</script>

<style>
[data-gmos-metadata-layout] {
  display: flex;
  flex-direction: column;
  border: none;
  background: #FAFAFA;
  padding: 24px;
}
[data-gmos-metadata-layout] header h3 {
  font-size: 1.5rem;
  font-weight: 300;
}
[data-gmos-metadata-layout] header i {
  margin-right: 12px;
}
[data-gmos-metadata-layout] main {
  padding: 24px;
}
[data-gmos-metadata-layout] h5 {
  font-size: 1rem;
  font-weight: 400;
  margin-right: 20px;
}
[data-gmos-metadata-layout] button:hover {
  filter: brightness(80%);
}
[data-gmos-metadata-layout] p {
  padding: 15px 0;
}
[data-gmos-metadata-layout] .aeris-year:hover {
  background: gainsboro;
}
[data-gmos-metadata-layout] .aeris-year {
  display: inline-block;
  padding: 2px;
  margin: 2px;
}
[data-gmos-metadata-layout] .aeris-year.selected {
  background: rgba(153, 198, 109, 0.5);
}
[data-gmos-metadata-layout] .loadingbar {
  background: gainsboro;
  padding: 3px;
}
[data-gmos-metadata-layout] .year-container {
  margin-top: 5px;
  margin-bottom: 5px;
}
[data-gmos-metadata-layout] .year-value {
  display: block;
  width: 40px;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  position: relative;
}
[data-gmos-metadata-layout] .year-label {
  display: block;
  text-align: center;
  font-size: 9px;
  text-transform: uppercase;
  margin-bottom: 2px;
  letter-spacing: .7px;
  cursor: pointer;
}
</style>