<template>
  <div id="app">
    <div v-if="isInvalidUser !== null">
      <transition name="fade-in-only-slow">
        <the-authentication
          v-if="!isReady"
          :is-invalid-email="isInvalidUser"
          :firebase-authentication="firebaseAuthentication"
        />
        <div class="container-fluid" v-if="isReady">
          <div class="row">
            <div class="col px-0">
              <the-navigation-bar />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <transition name="fade-in-only">
                <router-view/>
              </transition>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import loader from "./mixins/loader.js";
import {
  firebase,
  firebaseAuthentication,
  firestore,
  firebaseFunctions,
  db
} from "./util/firebase/index.js";
import {
  subscribeUserInfo,
  unsubscribeUserInfo
} from "./util/firebase/user.js";

export default {
  name: "app",
  components: {
    TheAuthentication: () => import("./views/TheAuthentication.vue"),
    TheNavigationBar: () => import("./components/TheNavigationBar.vue")
  },
  mixins: [loader],
  methods: {
    initRouterHooks: function() {
      this.$router.beforeResolve((to, from, next) => {
        if (to.name) {
          this.mountLoader();
        }
        next();
      });
      this.$router.afterEach(() => {
        this.destroyLoader();
      });
    },
    commitFirebaseTools: function() {
      this.$store.commit("firebase", firebase);
      this.$store.commit("firebaseAuthentication", firebaseAuthentication);
      this.$store.commit("firestore", firestore);
      this.$store.commit("firebaseFunctions", firebaseFunctions);
      this.$store.commit("db", db);
    }
  },
  computed: {
    isReady: function() {
      return (
        this.uid &&
        this.firstName !== null &&
        this.lastName !== null
      );
    },
    ...mapState([
      "isInvalidUser",
      "uid",
      "firstName",
      "lastName",
      "firestore",
      "firebaseAuthentication",
      "db"
    ])
  },
  watch: {
    isInvalidUser: function(newVal) {
      if (newVal) {
        this.destroyLoader();
      }
    }
  },
  created: function() {
    this.mountLoader();
    this.initRouterHooks();
    this.commitFirebaseTools();
    subscribeUserInfo(this.$store, this.firestore);
  },
  destroyed: function() {
    unsubscribeUserInfo();
  }
};
</script>

<style>
.fade-in-only-slow-enter-active {
  transition: opacity 500ms ease-out;
}

.fade-in-only-slow-enter {
  opacity: 0;
}

.fade-in-only-enter-active {
  transition: opacity 250ms ease-out;
}

.fade-in-only-enter {
  opacity: 0;
}
</style>

