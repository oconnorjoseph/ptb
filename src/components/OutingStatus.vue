<template>
  <div :id="this.$options.name">
    <button
      v-if="false"
      type="button"
      class="btn btn-primary float-right"
      @click="onGoBtnClicked()"
    >
      <span style="font-size: 16px;">
        <i class="fa fa-plus text-white mr-2"/>Let's Go!
      </span>
    </button>
    <button v-if="true" class="btn btn-success disabled disabled-light pr-3 float-right">
      <span style="font-size: 16px;">
        <i class="fa fa-check text-white mr-2"/>Going
      </span>
    </button>
    <button
      v-if="true"
      type="button"
      class="btn btn-warning disabled disabled-light px-3 float-right"
    >
      <span style="font-size: 16px;">Pending...</span>
    </button>
    <button
      v-if="true"
      type="button"
      class="btn btn-danger pr-3 float-right"
      @click="onCancelBtnClicked()"
    >
      <span style="font-size: 16px;">
        <i class="fa fa-times text-white mr-2"/>Cancel
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "OutingStatus",
  props: {
    db: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
        canAddUser: ""
    };
  },
  methods: {
    onGoBtnClicked: function() {},
    onCancelBtnClicked: function() {}
  },
  created: function() {
    this.db.outings.canAddUser();
  }
};
</script>

<style scoped>
.disabled,
.disabled-light {
  opacity: 1;
}
.btn-warning:focus,
.disabled-light {
  box-shadow: none;
}
.btn-success:focus,
.disabled-light {
  box-shadow: none;
}
</style>
