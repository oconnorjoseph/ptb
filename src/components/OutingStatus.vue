<template>
  <div :id="this.$options.name" v-if="userOutingStatus !== null">
    <button v-if="isAvailable" type="button" class="btn btn-success" @click="onGoBtnClicked()">
      <span style="font-size: 16px;">
        <i class="fa fa-plus text-white mr-2"/>Let's Go!
      </span>
    </button>
    <button
      v-else-if="isGoing"
      type="button"
      class="btn btn-danger pr-3"
      @click="onCancelBtnClicked()"
    >
      <span style="font-size: 16px;">
        <i class="fa fa-times text-white mr-2"/>Cancel
      </span>
    </button>
    <button
      v-else-if="isPending"
      type="button"
      class="btn btn-warning disabled disabled-light px-3"
    >
      <span style="font-size: 16px;">Pending...</span>
    </button>
    <button
      v-else-if="isWaitlistAvailable"
      type="button"
      class="btn btn-warning px-3"
      @click="onWaitlistBtnClicked()"
    >
      <span style="font-size: 16px;">Join Waitlist</span>
    </button>
  </div>
</template>

<script>
const AVAILABLE = "AVAILABLE";
const GOING = "GOING";
const PENDING = "PENDING";
const WAITLIST_AVAILABLE = "WAITLIST_AVAILABLE";

export default {
  name: "OutingStatus",
  props: {
    db: {
      type: Object,
      required: true
    },
    outingId: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      userOutingStatus: null
    };
  },
  computed: {
    isAvailable: function() {
      return this.userOutingStatus === AVAILABLE;
    },
    isGoing: function() {
      return this.userOutingStatus === GOING;
    },
    isPending: function() {
      return this.userOutingStatus === PENDING;
    },
    isWaitlistAvailable: function() {
      return this.userOutingStatus === WAITLIST_AVAILABLE;
    }
  },
  methods: {
    onGoBtnClicked: function() {
      db.groups.addCurrentUser(this.outingId);
    },
    onCancelBtnClicked: function() {
      db.groups.removeCurrentUser(this.outingId);
    },
    onWaitlistBtnClicked: function() {
      db.groups.addCurrentUser(this.outingId);
    },
    onSnapshot: (userOutingStatus) => {
      console.log(userOutingStatus);
      this.userOutingStatus = userOutingStatus;
    }
  },
  created: function() {
    this.db.outings.subscribeUserOutingStatus(this.outingId, this.onSnapshot);
  },
  destroyed: function() {
    this.db.outings.unsubscribeUserOutingStatus(this.outingId);
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
</style>
