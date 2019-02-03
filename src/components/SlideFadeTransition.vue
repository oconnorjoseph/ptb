<template>
  <transition
    :id="this.$options.name"
    v-on:enter="slideFadeIn"
    v-on:leave="fadeSlideOut"
    mode="out-in"
  >
    <slot/>
  </transition>
</template>

<script>
import Velocity from "velocity-animate";

const DEFAULT_DURATION = 150;

export default {
  name: "SlideFadeTransistion",
  props: {
    // In milliseconds
    duration: {
      type: Number,
      default: DEFAULT_DURATION
    }
  },
  methods: {
    slideFadeIn(el) {
      el.style.opacity = 0;
      Velocity(el, "slideDown", this.duration * 0.15);
      Velocity(el, { opacity: 1 }, this.duration * 0.85);
    },
    fadeSlideOut(el) {
      Velocity(el, { opacity: 0 }, this.duration * 0.85);
      Velocity(el, "slideUp", this.duration * 0.15);
    }
  }
};
</script>
