<template>
  <div :id="this.$options.name">
    <div class="row p-2">
      <div class="col">
        <template v-for="outing in outings">
          <div class="row py-2" :key="outing.id">
            <div class="col">
              <outing-card :outing="outing" :db="db"/>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OutingsList",
  components: {
    OutingCard: () => import("./OutingCard.vue")
  },
  props: {
    outings: {
      type: Array,
      required: false
    },
    db: {
      type: Object,
      required: true
    }
  }
};
</script>
