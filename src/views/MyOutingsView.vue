<template>
  <div :id="this.$options.name">
    <div class="row">
      <div class="col">
        <outings-list :outings="myOutings" />
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
    }
  },
  computed: mapState(["db"]),
  created: function() {
    this.db.outings.subscribeAllOutings(this.myOutings);
  },
  destroyed: function() {
    this.db.outings.unsubscribeAllOutings();
  }
};
</script>

