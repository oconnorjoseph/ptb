<template>
  <div :id="this.$options.name" class="container-fluid">
    <div class="p-4 text-center" v-if="!isReAuthentication">
      <div class="row">
        <div class="col">
          <logo-svg/>
        </div>
      </div>
      <div class="row p-2">
        <div class="col">
          <h1 id="title" class="display-4">Pop The Bubble</h1>
        </div>
      </div>
    </div>
    <div class="row p-4 text-center" v-if="isReAuthentication && !isInvalidEmail">
      <div class="col">
        <h1 id="reauthenticateMessage" class="display-4">Please re-enter your credentials:</h1>
      </div>
    </div>
    <div class="row p-2 text-center" v-if="dangerMessage">
      <div class="col">
        <div class="alert alert-danger mx-auto">{{dangerMessage}}</div>
      </div>
    </div>
    <firebase-authentication-widget
      :firebase-authentication="firebaseAuthentication"
      :key="firebaseAuthenticationWidgetKey"
    />
  </div>
</template>

<script>
const INCORRECT_EMAIL_MESSAGE =
  "You entered an incorrect email address. Please re-enter your ORIGINAL credentials.";
const NON_REGISTERED_EMAIL_MESSAGE =
  "The previous email address is not an official Columbia University email. Please sign in using a valid Columbia University email address.";

export default {
  name: "TheAuthentication",
  components: {
    LogoSvg: () => import("./../components/LogoSvg.vue"),
    FirebaseAuthenticationWidget: () =>
      import("./../components/FirebaseAuthenticationWidget.vue")
  },
  props: {
    firebaseAuthentication: {
      type: Object,
      required: true
    },
    isReAuthentication: {
      type: Boolean,
      default: false
    },
    isInvalidEmail: {
      type: Boolean,
      default: false
    },
    // If you would like to force the user to sign in with a specific email,
    // set restrictedEmail to that specific email
    restrictedEmail: {
      type: String
    }
  },
  data: function() {
    return {
      firebaseAuthenticationWidgetKey: 0
    };
  },
  computed: {
    dangerMessage: function() {
      if (this.isInvalidEmail) {
        if (this.isReAuthentication) {
          return INCORRECT_EMAIL_MESSAGE;
        } else {
          return NON_REGISTERED_EMAIL_MESSAGE;
        }
      }
      return null;
    }
  },
  watch: {
    isInvalidEmail: function(newVal) {
      if (newVal) {
        if (this.firebaseAuthentication.currentUser) {
          this.firebaseAuthentication.signOut().then(() => {
            this.firebaseAuthenticationWidgetKey++;
          });
        } else {
          this.firebaseAuthenticationWidgetKey++;
        }
      }
    }
  }
};
</script>

<style scoped>
#LogoSvg {
  width: 15vw;
  min-width: 140px;
  max-width: 360px;
}
@media (max-width: 768px) {
  #reauthenticationMessage {
    font-size: 6.5vw;
  }
}
@media (min-width: 768px) {
  #title {
    font-size: 6.5vw;
  }
  #reauthenticationMessage {
    font-size: 4.5vw;
  }
}

.alert {
    max-width: 360px;
}
</style>
