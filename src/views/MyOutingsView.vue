<template>
  <div :id="this.$options.name">
    <div class="row">
      <div class="col">
        <outings-list :outings="myOutings" :db="db"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DashboardView",
  components: {
    OutingsList: () => import("./../components/OutingsList.vue")
  },
  data: function() {
    return {
      myOutings: []
    };
  },
  computed: mapState(["db"]),
  created: function() {
    this.db.outings.subscribeUserOutings(this.myOutings);
  },
  destroyed: function() {
    this.db.outings.unsubscribeUserOutings();
  }
};
</script>

