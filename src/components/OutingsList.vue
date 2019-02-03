<template>
  <div :id="this.$options.name">
    <div class="row p-2">
      <div class="col">
        <template v-for="outing in outings">
          <div class="row py-2" :key="outing.id">
            <div class="col">
              <editable-outing-card v-if="editable" :outing="outing" :db="db" :outing-id="outing.id"/>
              <outing-card v-else :outing="outing" :db="db" :outing-id="outing.id"/>
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
    OutingCard: () => import("./OutingCard.vue"),
    EditableOutingCard: () => import("./EditableOutingCard.vue")
  },
  props: {
    outings: {
      type: Array,
      required: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    db: {
      type: Object,
      required: true
    }
  }
};
</script>
