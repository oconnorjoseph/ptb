<template>
  <navigation-bar :id="this.$options.name">
    <ul slot="navbar-nav" class="navbar-nav">
      <!-- Link to Dashboard 'page' -->
      <li class="nav-item">
        <button
          type="button"
          class="btn m-1"
          :class="[isAtDashboard ? 'btn-secondary' : 'btn-primary']"
          @click="$router.push(dashboardPath)"
        >
          <span class="text-nowrap">Home</span>
        </button>
      </li>
      <!-- Link to CreateOutings 'page' -->
      <li class="nav-item">
        <button
          type="button"
          class="btn m-1"
          :class="[isAtCreateOutings ? 'btn-secondary' : 'btn-primary']"
          @click="$router.push(createOutingsPath)"
        >
          <span class="text-nowrap">Create Outing</span>
        </button>
      </li>
      <!-- Link to MyOutings 'page' -->
      <li class="nav-item">
        <button
          type="button"
          class="btn m-1"
          :class="[isAtMyOutings ? 'btn-secondary' : 'btn-primary']"
          @click="$router.push(myOutingsPath)"
        >
          <span class="text-nowrap">My Outings</span>
        </button>
      </li>
    </ul>
    <!-- Link to Settings 'page' -->
    <router-link slot="rightward-nav" class="nav-link mx-0 pl-0" :to="settingsPath">
      <span style="font-size: 16px;">
        <i class="fa fa-cog text-secondary"></i>
      </span>
    </router-link>
  </navigation-bar>
</template>

<script>
import { mapState } from "vuex";
import {
  SETTINGS_PATH,
  CREATE_OUTINGS_PATH,
  MY_OUTINGS_PATH,
  DASHBOARD_PATH
} from "./../router/paths.js";

export default {
  name: "TheNavigationBar",
  components: {
    NavigationBar: () => import("./NavigationBar.vue")
  },
  data: function() {
    return {
      dashboardPath: DASHBOARD_PATH,
      settingsPath: SETTINGS_PATH,
      createOutingsPath: CREATE_OUTINGS_PATH,
      myOutingsPath: MY_OUTINGS_PATH
    };
  },
  computed: {
    currentPath: function() {
      return this.$route;
    },
    isAtDashboard: function() {
      const path = this.$route.path;
      return !path || path === this.dashboardPath;
    },
    isAtCreateOutings: function() {
      const path = this.$route.path;
      return path && path === this.createOutingsPath;
    },
    isAtMyOutings: function() {
      const path = this.$route.path;
      return path && path === this.myOutingsPath;
    }
  }
};
</script>
