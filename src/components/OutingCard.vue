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
      <div class="row py-2">
        <div class="col">
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
  props: {
    outing: {
      type: Object,
      required: false
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
    onGoBtnClicked: function() {
      //
    },
    onOutingSnapshot: function(data) {
      this.organizer = data.organizer;
      this.location = data.location;
      this.desc = data.desc;
    },
    detatchOutingDetails: function() {
      this.db.outings.unsubscribeOuting(this.outing.id);
    },
    attachOutingDetails: function() {
      this.db.outings.subscribeOuting(this.outing.id, this.onOutingSnapshot);
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
      return this.desc;
    }
  },
  destroyed: function() {
    this.detatchOutingDetails();
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
