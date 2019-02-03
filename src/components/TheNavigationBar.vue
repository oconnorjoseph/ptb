<template>
  <navigation-bar :id="this.$options.name">
    <ul slot="navbar-nav" class="navbar-nav">
      <!-- Link to Dashboard 'page' -->
      <li class="nav-item">
        <button type="button" class="btn btn-secondary m-1" @click="$router.push(dashboardPath)">
          <span class="text-nowrap">Dashboard</span>
        </button>
      </li>
      <!-- Link to CreateOutings 'page' -->
      <li class="nav-item">
        <button type="button" class="btn btn-secondary m-1" @click="$router.push(createOutingsPath)">
          <span class="text-nowrap">Create Outing</span>
        </button>
      </li>
      <!-- Link to MyOutings 'page' -->
      <li class="nav-item">
        <button type="button" class="btn btn-secondary m-1" @click="$router.push(myOutingsPath)">
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
      return this.$router.currentRoute;
    }
  }
};
</script>
