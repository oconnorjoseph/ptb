<template>
  <div :id="this.$options.name" class="card text-center">
    <div class="card-header" @click="isExpanded = !isExpanded">
      <div class="row">
        <div class="col align-self-center">
          <h4 class="card-title mb-0 text-left">{{outing.name}}</h4>
        </div>
        <div class="col align-self-center">
          <h4 class="card-title mb-0 text-right">{{outing.date}}</h4>
        </div>
        <div class="col align-self-center" style="max-width: 16px;">
          <span class="float-right" style="font-size: 16px;">
            <i class="fa fa-window-maximize text-primary p-0" v-if="!isExpanded"/>
            <i class="fa fa-window-minimize text-primary p-0" v-else/>         
          </span>
        </div>
      </div>
    </div>
    <div class="card-body py-2" v-if="isExpanded">
      <div class="row pt-2">
        <div class="col" style="max-width: 100px;">
          <h5 class="card-text text-nowrap text-left">Organizer:</h5>
        </div>
        <div class="col">
          <h5 class="card-text text-nowrap text-left">{{outing.organizer}}</h5>
        </div>
      </div>
      <div class="row pt-2">
        <div class="col" style="max-width: 100px;">
          <h5 class="card-text text-nowrap text-left">Location:</h5>
        </div>
        <div class="col">
          <h5 class="card-text text-nowrap text-left">{{outing.location}}</h5>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col">
          <h5 class="card-text text-nowrap text-left">Description:</h5>
          <h6 class="card-text text-left pl-4">{{outing.desc}}</h6>
        </div>
      </div>
      <div class="row py-2">
        <div class="col">
          <button v-if="false" type="button" class="btn btn-primary float-right" @click="onGoBtnClicked()">
            <span style="font-size: 16px;">
              <i class="fa fa-plus text-white mr-2"/>Let's Go!
            </span>
          </button>
          <button v-if="true" class="btn btn-success pr-3 float-right" @click="onGoBtnClicked()">
            <span style="font-size: 16px;">
              <i class="fa fa-check text-white mr-2"/>Going
            </span>
          </button>
          <button v-if="true" type="button" class="btn btn-success pr-3 float-right" @click="onGoBtnClicked()">
            <span style="font-size: 16px;">
              <i class="fa fa-check text-white mr-2"/>Going
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const SCORE_STR = "Score";

export default {
  name: "OutingCard",
  props: {
    outing: {
      type: Object,
      required: false //TODO
    }
  },
  data: function() {
    return {
      isExpanded: false
    };
  },
  methods: {
    onGoBtnClicked: function() {
      //
    }
  },
  watch: {
    isExpanded: function(newVal) {
      if (newVal) {
        // FETCH OUTING DATA
      }
    }
  }
};
</script>

