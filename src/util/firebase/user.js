/**
 * Automatically subscribes / unsubscribes a Vuex store to the authenticated user's information.
 */
var userInfoUnsubscriber;

/**
 * Stops listening to changes concerning the user's Firebase
 * Authentication user-object as well as the user's
 * Firestore document
 */
export function unsubscribeUserInfo() {
  if (userInfoUnsubscriber) {
    userInfoUnsubscriber();
  }
}

/**
 * Does stuff, sorry.
 * @param {} store The vue store instance for the app
 */
export function subscribeUserInfo(store) {
  store.state.firebaseAuthentication.onAuthStateChanged(function(user) {
    if (isSigningIn(user, store.state)) {
      if (isColumbiaEmail(user)) {
        onSignIn(user, store);
      } else {
        store.commit("isInvalidUser", true);
        store.state.firebaseAuthentication.currentUser.delete();
      }
    } else if (isSigningOut(user, store.state)) {
      onSignOut(store);
    } else if (!isAuthStateDetermined(store)) {
      store.commit("isInvalidUser", false);
    }
  });
}

function isColumbiaEmail(user) {
  return user.email.endsWith("@columbia.edu");
}

function isAuthStateDetermined(store) {
  return store.state.isInvalidUser !== null;
}

function isSigningOut(user, state) {
  return !user && state.uid;
}
function isSigningIn(user, state) {
  return user && !state.uid;
}
function onSignOut(store) {
  unsubscribeUserInfo();
  clearUserInfo(store);
}
function onSignIn(user, store) {
  store.commit("uid", user.uid);
  store.commit("email", user.email);
  const userInfoRef = getUserInfoRef(store, user.uid);
  attachSubscribers(userInfoRef, store);
}
function clearUserInfo(store) {
  store.commit("uid", null);
  store.commit("email", null);
  store.commit("firstName", null);
  store.commit("lastName", null);
  store.commit("recieveNotifications", false);
}
function getUserInfoRef(store, uid) {
  return store.state.firestore.collection("user").doc(uid);
}
function attachSubscribers(userInfoRef, store) {
  attachUserInfo(userInfoRef, store);
}

function attachUserInfo(userInfoRef, store) {
  userInfoUnsubscriber = userInfoRef.onSnapshot(function(userInfoDoc) {
    updateUserInfo(userInfoDoc, store);
  });
}

function updateUserInfo(userInfoDoc, store) {
  if (userInfoDoc.exists) {
    const userInfo = userInfoDoc.data();
    store.commit("firstName", userInfo.firstName);
    store.commit("lastName", userInfo.lastName);
    store.commit(
      "recieveNotifications",
      userInfo.recieveNotifications || false
    );
  }
  store.commit("isInvalidUser", false);
}
