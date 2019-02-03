export default {
  methods: {
    mountLoader: function(config) {
      if (this.loader) {
        this.destroyLoader();
      }
      this.loader = this.$loading.show(config);
    },
    destroyLoader: function() {
      if (this.loader) {
        this.loader.hide();
        this.loader = null;
      }
    }
  },
  data: function() {
    return {
      loader: null
    };
  },
  destroyed: function() {
    if (this.loader) {
      this.destroyLoader();
    }
  }
};
