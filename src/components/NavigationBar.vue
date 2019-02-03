<template>
  <nav :id="this.$options.name" class="navbar navbar-expand navbar-light bg-light px-1">
    <a class="navbar-brand mr-2" href="#">
      <span>
        <logo-svg class="ml-2" style="width: 24px"/>
      </span>
    </a>
    <!-- Part of navigaton bar with different links to click to reach the different 'pages'. 
    All of these links are pushed leftward-->
    <div class="collapse navbar-collapse">
      <div class="mr-auto">
        <slot name="navbar-nav"/>
      </div>
      <!-- Rightward navigation links -->
      <slot name="rightward-nav"/>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavigationBar",
  components: {
    LogoSvg: () => import("./LogoSvg.vue")
  }
};
</script>
