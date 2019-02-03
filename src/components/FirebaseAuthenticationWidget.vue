<template>
  <div class="row">
    <div class="col">
      <!-- Google's Email Sign-In Widget -->
      <div id="firebaseui-auth-container" class="container-fluid"></div>
    </div>
  </div>
</template>

<script>
require("./../assets/css/firebaseui.css");

export default {
  props: {
    firebaseAuthentication: {
      type: Object,
      required: true
    },
    // Refers to vue-loader-plugin
    useLoaderPlugin: {
      type: Boolean,
      default: true
    }
  },
  mounted: function() {
    this.firebaseAuthentication.launchFirebaseAuthenticationUI();
  }
};
</script>
