<template>
  <div :id="this.$options.name">
    <div class="row">
      <div class="col">
        <outings-list :outings="editableOutings" :db="db"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PlanOutingsView",
  components: {
    OutingsList: () => import("./../components/OutingsList.vue")
  },
  data: function() {
    return {
      editableOutings: []
    };
  },
  computed: mapState(["db"]),
  created: function() {
    this.db.outings.subscribeMyOutings(this.myOutings);
  },
  destroyed: function() {
    this.db.outings.unsubscribeMyOutings();
  }
};
</script>
