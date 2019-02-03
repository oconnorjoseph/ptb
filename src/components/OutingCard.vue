<template>
  <div :id="this.$options.name" class="card text-center">
    <div class="card-header" @click="isShowingDetails = !isShowingDetails">
      <div class="row">
        <div class="col align-self-center">
          <h4 class="card-title mb-0 text-left">{{outing.title}}</h4>
        </div>
        <div class="col align-self-center">
          <h5 class="card-title mb-0 text-right">{{formattedDate}}</h5>
        </div>
        <div class="col align-self-center" style="max-width: 16px;">
          <span class="float-right" style="font-size: 16px;">
            <i class="fa fa-window-maximize text-primary p-0" v-if="!isShowingDetails"/>
            <i class="fa fa-window-minimize text-primary p-0" v-else/>
          </span>
        </div>
      </div>
    </div>
    <div class="card-body py-2" v-if="hasDetails">
      <div class="row pt-2">
        <div class="col" style="max-width: 100px;">
          <h5 class="card-text text-nowrap text-left">Organizer:</h5>
        </div>
        <div class="col">
          <h5 class="card-text text-nowrap text-left">{{organizer}}</h5>
        </div>
      </div>
      <div class="row pt-2">
        <div class="col" style="max-width: 100px;">
          <h5 class="card-text text-nowrap text-left">Location:</h5>
        </div>
        <div class="col">
          <h5 class="card-text text-nowrap text-left">{{location}}</h5>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col">
          <h5 class="card-text text-nowrap text-left">Description:</h5>
          <h6 class="card-text text-left pl-4">{{desc}}</h6>
        </div>
      </div>
      <hr>
      <div class="row py-2">
        <div class="col">
          <outing-status :db="db" class="float-right" :outing-id="outingId"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const SCORE_STR = "Score";

const FORMATTED_DATE_OPTIONS = {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit"
};

export default {
  name: "OutingCard",
  components: {
    OutingStatus: () => import("./OutingStatus.vue")
  },
  props: {
    outing: {
      type: Object,
      required: false
    },
    outingId: {
      type: String,
      required: true
    },
    db: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      isShowingDetails: false,
      organizer: null,
      location: null,
      desc: null
    };
  },
  methods: {
    resetDetails: function() {
      this.organizer = null;
      this.location = null;
      this.desc = null;
    },
    fetchFullName: async function(organizer_id) {
      const organizer = await this.db.users.getName(organizer_id);
      return organizer.firstName + " "  + organizer.lastName;
    },
    onOutingSnapshot: async function(data) {
      this.organizer = await this.fetchFullName(data.organizer_id);
      this.location = data.location;
      this.desc = data.desc;
    },
    detatchOutingDetails: function() {
      this.db.outings.unsubscribeOuting(this.outingId);
      this.resetDetails();
    },
    attachOutingDetails: function() {
      this.db.outings.subscribeOuting(this.outingId, this.onOutingSnapshot);
    }
  },
  watch: {
    isShowingDetails: function(newVal) {
      if (newVal) {
        this.attachOutingDetails();
      } else {
        this.detatchOutingDetails();
      }
    }
  },
  computed: {
    formattedDate: function() {
      const milliseconds = this.outing.datetime.seconds * 1000;
      const date = new Date(milliseconds);
      return date.toLocaleString(undefined, FORMATTED_DATE_OPTIONS);
    },
    hasDetails: function() {
      return this.desc || this.location || this.organizer;
    }
  },
  destroyed: function() {
    this.detatchOutingDetails();
  }
};
</script>