<i18n>
{
    "en": {
    "loading": "Loading...",
    "updating": "Checking for updates..."
    },
    "fr": {
    "loading": "Chargement...",
    "updating": "Recherche de mises à jour..."
    }
}
</i18n>

<template>
<div data-gmos-thesaurus-item-tree-checkbox-layout title="">

  <div v-if="isLoading" class="loading-bar">
    <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
    <span>{{$t('loading')}}</span>
  </div>
  <div v-if="isUpdating" class="loading-bar">
    <i class="fa fa-circle-o-notch fa-spin fa-fw"></i>
    <span>{{$t('updating')}}</span>
  </div>

  <main v-for="(item,index) of items" :key="item.search">
    <div class="first-level">
      <main>
        <input type="checkbox" :id="`${name}${item.name}`" :checked="item.checked" @change="checkFirstLevel(index)">
        <label :for="`${name}${item.name}`">{{item.name}}</label>
      </main>
    </div>
  </main>

</div>
</template>

<script>
export default {
  name: 'gmos-thesaurus-item-tree-checkbox-layout-component',
  props: {
    lang: {
      type: String,
      default: 'en'
    },
    name: {
      type: String
    },
    type: {
      type: String,
      default: null
    },
    nameSubitems: {
      type: String
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
    document.removeEventListener('aerisCatalogueSearchEvent', this.handleSearchBarListener);
    this.handleSearchBarListener = null;
    document.removeEventListener('aerisCatalogueResetEvent', this.handleSearchBarResetListener);
    this.handleSearchBarResetListener = null;
  },
  created: function() {
    this.$i18n.locale = this.lang;
    this.aerisThemeListener = this.handleTheme.bind(this);
    document.addEventListener('aerisTheme', this.aerisThemeListener);
    this.handleSearchBarListener = this.handleSearchBarEvent.bind(this);
    document.addEventListener('aerisCatalogueSearchEvent', this.handleSearchBarListener);
    this.handleSearchBarResetListener = this.handleSearchBarResetEvent.bind(this);
    document.addEventListener('aerisCatalogueResetEvent', this.handleSearchBarResetListener);
    this.load();
  },
  mounted() {
    console.log('Aeris thesaurus tree checkbox - created');
    document.dispatchEvent(new CustomEvent('aerisThemeRequest', {}));
  },
  computed: {
    isLoading: function() {
      return ((this.loading) && (!this.existing))
    },
    isUpdating: function() {
      return ((this.loading) && (this.existing))
    }
  },
  data() {
    return {
      aerisThemeListener: null,
      handleSearchBarListener: null,
      handleSearchBarResetListener: null,
      parentService: null,
      items: [],
      loading: false,
      theme: [],
      existing: false,
      selectedItems: []
    }
  },
  methods: {
	handleTheme: function(theme) {
    	this.theme = theme;
    	this.colorBaddges(this.theme);
    },
    colorBaddges: function(theme) {
	  if (this.$el.querySelectorAll(".badge")) {
        this.$el.querySelectorAll(".badge").forEach(el => el.style.background = theme.detail.emphasis);
      }
    },
    checkFirstLevel(index)  {
      this.items[index].checked = !this.items[index].checked;
      this.items[index].deployed = this.items[index].checked;
      if (this.items[index].thesaurusItems) {
    	  for (let i = 0; i < this.items[index].thesaurusItems.length; i++) {
        	  this.checkSecondLevel(index, i, this.items[index].checked);
    		}
      }
      // for handle search
      let searchString = this.items[index].search;
      if (this.items[index].checked) {
    	  this.selectedItems.push(searchString);
      } else {
    	  this.selectedItems.splice(this.selectedItems.indexOf(searchString), 1);
      }
    },
    toggle(index) {
      this.items[index].deployed = !this.items[index].deployed;
      this.$nextTick(function () {
          // Defer the callback to be executed after the next DOM update cycle
    	  // otherwise badges won't be visible on first load
    	  this.colorBaddges(this.theme);
        })
    },
    load() {
      this.loading = true;
      if (window.localStorage) {
        let storedValues = window.localStorage.getItem('aeris' + this.name + 'Types');
        if ((storedValues != null) && (storedValues != "undefined")) {
          this.items = JSON.parse(storedValues);
          this.existing = true;
        }
      };
      // let parentService = document.querySelector('aeris-catalog').attributes.getNamedItem('metadata-service').value;
      // parentService = parentService.endsWith('/') ? parentService + this.type + '/' : parentService + '/' + this.type + '/';
      // let url = this.service || parentService;
      // if (document.querySelector('aeris-catalog').attributes.getNamedItem('program')) {
      //   let program = document.querySelector('aeris-catalog').attributes.getNamedItem('program').value;
      //   if (program) {
      //     url += "?program=" + program;
      //   }
      // }
      console.log("Aeris - load - Appel au serveur")
      this.$http.get("https://sedoo.aeris-data.fr/gmos-datacenter-rest/rest/metadatarecette/platformnames?program=GMOS", {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then((response) => {
          this.handleResponse(response)
        }, (response) => {
          this.handleError(response)
        });
    },
    handleResponse: function(response) {
      console.log(response)
      this.loading = false;
      let itemsArray = response.body.map(item => {
                  return {
                    checked: false,
                    deployed: false,
                    name: item,
                    search: item
                  }
        }).sort(function(a, b){
           return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
        });
        this.items = itemsArray;

        this.existing = true;
        if (window.localStorage) {
          window.localStorage.setItem('aeris' + this.name + 'Types', JSON.stringify(this.items));
        }
        this.$nextTick(function () {
           // Defer the callback to be executed after the next DOM update cycle
           // otherwise badges won't be visible on first load
           this.colorBaddges(this.theme);
        })
    },
    handleError: function(response) {
      this.loading = false;
      console.log("Aeris " + this.name + " criteria - Error while accessing server:");
      let error = response.status;
      let message = response.statusText;
      if (!error) message = 'Can\'t connect to the server';
      console.log('Error ' + error + ': ' + message);
    },
    handleSearchBarEvent: function(e) {
      if (this.selectedItems.length > 0) {
        e.detail[this.nameSubitems] = this.selectedItems;
      }
    },
    handleSearchBarResetEvent: function(e) {
    	let i;
    	for (i = 0; i < this.items.length; i++) {
    		this.items[i].checked = true;
    		this.checkFirstLevel(i);
    	}
    	this.selectedItems = [];
    }
  }
}
</script>
<style>
[data-aeris-thesaurus-item-tree-checkbox-layout] {
  color: #FAFAFA;
}
[data-aeris-thesaurus-item-tree-checkbox-layout] .loading-bar {
  padding: 8px 0;
}
[data-aeris-thesaurus-item-tree-checkbox-layout] .first-level {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 5px 0;
}
[data-aeris-thesaurus-item-tree-checkbox-layout] .second-level {
  	margin-left: 12px;
  	padding: 5px 0;
}
[data-aeris-thesaurus-item-tree-checkbox-layout] .second-level > div:first-child {
	display : flex;
	align-items: flex-start;
	justify-content: space-between;
}
[data-aeris-thesaurus-item-tree-checkbox-layout] label {
	overflow-wrap:break-word;
	-webkit-hyphens: auto;
	-moz-hyphens: auto;
	-ms-hyphens: auto;
	-o-hyphens: auto;
	hyphens:auto;
}
[data-aeris-thesaurus-item-tree-checkbox-layout] .third-level {
  margin-left: 15px;
  padding: 5px 0;
}
[data-aeris-thesaurus-item-tree-checkbox-layout] input {
  margin-right: 15px;
}
[data-aeris-thesaurus-item-tree-checkbox-layout] .first-level aside {
  display: flex;
  align-items: center;
}
[data-aeris-thesaurus-item-tree-checkbox-layout] .second-level aside {
  display: flex;
  align-items: center;
}
[data-aeris-thesaurus-item-tree-checkbox-layout] .badge {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 0 8px;
  padding: 2px 6px;
  font-size: 0.6em;
  font-weight: 700;
  line-height: 1;
}
[data-aeris-thesaurus-item-tree-checkbox-layout] .deployed {
  cursor: pointer;
}
[data-aeris-thesaurus-item-tree-checkbox-layout] .downloadable {
  color: #f39c12;
}
</style>