<template>
  <div :id="this.$options.name">
    <div class="row">
      <div class="col">
        <outings-list />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardView",
  components: {
    OutingsList: () => import("./../components/OutingsList.vue")
  }
};
</script>

