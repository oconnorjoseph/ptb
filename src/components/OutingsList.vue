<template>
  <div :id="this.$options.name">
    <div class="row p-2">
      <div class="col">
        <template v-for="outing in outings">
          <div class="row py-2" :key="outing.id">
            <div class="col">
              <outing-card :outing="outing"/>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "OutingsList",
  components: {
    OutingCard: () => import("./OutingCard.vue")
  },
  data: function() {
    return {
      outings: []
    };
  },
  computed: mapState(["db"]),
  created: function() {
    this.db.outings.subscribeAllOutings(this.outings);
  }
};
</script>
