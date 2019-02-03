/**
 * Initializes firebase, firebase authentication, firebaseui firestore, and firebase functions
 */

import firebase from "firebase";
import firebaseui from "firebaseui";
import "firebase/functions";

// ***** Initialize Firebase *****
// Configuration for the AIR app
const CONFIG = {
  apiKey: "AIzaSyB4dt9KO9ReJ3YZj78hsMnPMvv_KWMX56I",
  authDomain: "pop-the-bubble-230522.firebaseapp.com",
  databaseURL: "https://pop-the-bubble-230522.firebaseio.com",
  projectId: "pop-the-bubble-230522",
  storageBucket: "",
  messagingSenderId: "942773920709"
};
firebase.initializeApp(CONFIG);
export { firebase };

// ***** Initialize Firebase Authentication *****
const firebaseAuthentication = firebase.auth();
// Enable authentication persistence between tab instances
firebaseAuthentication.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
export { firebaseAuthentication };

// ***** Initailize Firebase Authentication UI *****

// Configuration for the Firebase Authentication UI
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function() {
      if (firebaseAuthentication.onSuccessfulSignIn) {
        const user = firebaseAuthentication.currentUser;
        firebaseAuthentication.onSuccessfulSignIn(user);
      }
      return false;
    },
    uiShown: function() {
      if (firebaseAuthentication.onUIShown) {
        firebaseAuthentication.onUIShown();
      }
    }
  },
  // Disables accountchooser
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  // Require email address rather than display name for Firebase Authentication
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    }
  ]
};
// Build a new Firebase Authentication UI instance
var firebaseAuthenticationUI = new firebaseui.auth.AuthUI(firebase.auth());
firebaseAuthentication.launchFirebaseAuthenticationUI = function() {
  if (firebaseAuthenticationUI) {
    firebaseAuthenticationUI.reset();
  }
  // NOTE: Will wait until the DOM has first loaded
  firebaseAuthenticationUI.start("#firebaseui-auth-container", uiConfig);
};

// ***** Initialize Firestore *****
const firestore = firebase.firestore();
// Enable offline persistence between multiple tabs
firestore.enablePersistence({ experimentalTabSynchronization: true });
export { firestore };

// ***** initialize Firebase Cloud Functions *****
const firebaseFunctions = firebase.functions();
export { firebaseFunctions };

// database setup
import OutingsModel from "./dbModels/OutingsModel";
import GroupsModel from "./dbModels/GroupsModel";
import UsersModel from "./dbModels/UsersModel";

class Database {
  constructor(dbRef) {
    this.dbRef = dbRef;
    this.firebase = firebase;
    this.outings = new OutingsModel(this);
    this.groups = new GroupsModel(this);
    this.users = new UsersModel(this);
  }
}

const db = new Database(firestore);

export { db };
