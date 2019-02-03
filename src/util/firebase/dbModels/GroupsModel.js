import firebase from "firebase";

class GroupsModel {
  constructor(db) {
    this.db = db;
    this.userStatusUnsubscriber;
    this.nextPendingUnsubscriber;
    this.attendeesUnsubscriber;
    this.pendingUnsubscriber;
    this.goingUnsubscriber;
  }

  unsubscribeUserStatus() {
    if (this.userStatusUnsubscriber) {
      this.userStatusUnsubscriber();
      this.userStatusUnsubscriber = null;
    }
  }

  // userStatusObj =>
  //    str: "" if not going, "pending" if unconfirmed, "going" if confirmed
  subscribeUserStatus(outing_id, user_id, onSnapshot) {
    if (!this.userStatusUnsubscriber) {
      this.userStatusUnsubscriber = this.db.outings.outingsRef
        .doc(outing_id)
        .collection("attendees")
        .where("user_id", "==", user_id)
        .onSnapshot(querySnapshot => {
          var status = "";
          if (!querySnapshot.empty) {
            status = querySnapshot.data().status;
          }
          onSnapshot(status);
        });
    }
  }

  // returns "" if not going, "pending" if unconfirmed, "going" if confirmed
  async getUserStatus(outing_id, user_id) {
    const querySnapshot = await this.db.outings.outingsRef
      .doc(outing_id)
      .collection("attendees")
      .where("user_id", "==", user_id)
      .get();
    if (querySnapshot.empty) {
      return "";
    } else {
      return querySnapshot.data().status;
    }
  }

  // adds user to pending list for a closed outing, going if open
  async addUser(outing_id) {
    const user_id = this.db.users.getCurrentUserId();
    const grantedUserStatus = await this.db.outings.canAddUser(
      outing_id,
      user_id,
      false
    );
    if (grantedUserStatus) {
      this.db.outings.outingsRef
        .doc(outing_id)
        .collection("attendees")
        .add({
          user_id: user_id,
          joined: firebase.ServerValue.TIMESTAMP,
          status: grantedUserStatus
        });

    }
  }

  // confirms user from pending to going for a closed outing
  async confirmUser(outing_id, user_id) {
    const grantedUserStatus = await this.db.outings.canAddUser(
      outing_id,
      user_id,
      true // bypasses closed event
    );
    if (grantedUserStatus === "going") {
      this.db.outings
        .doc(outing_id)
        .collection("attendees")
        .where("user_id", "==", user_id)
        .get()
        .then(querySnapshot => {
          // assuming single result
          querySnapshot.docs[0].ref.update({ status: "going" });
        });
    }
  }

  //async removeUser(outing_id, user_id) {
  //
  //}

  // gets the next chronological pending user
  unsubscribeNextPending() {
    if (this.nextPendingUnsubscriber) {
      this.nextPendingUnsubscriber();
      this.nextPendingUnsubscriber = null;
    }
  }

  // nextPendingObj =>
  //    str: user_id
  //    timestamp: joined
  //    str: status="pending"
  subscribeNextPending(nextPendingObj, outing_id) {
    if (!this.nextPendingUnsubscriber) {
      this.nextPendingUnsubscriber = this.db.outings.outingsRef
        .doc(outing_id)
        .collection("attendees")
        .where("status", "==", "pending")
        .sortBy("joined")
        .limit(1)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            Object.keys(doc.data()).forEach(key => {
              nextPendingObj[key] = doc.data[key];
            });
          });
        });
    }
  }

  unsubscribeAttendees() {
    if (this.attendeesUnsubscriber) {
      this.attendeesUnsubscriber();
      this.attendeesUnsubscriber = null;
    }
  }

  // attendeesArray => array with fields
  //    str: user_id
  //    timestamp: joined
  //    str: status
  subscribeAttendees(attendeesArray, outing_id) {
    if (!this.attendeesUnsubscriber) {
      this.attendeesUnsubscriber = this.db.outings.outingsRef
        .doc(outing_id)
        .collection("attendees")
        .onSnapshot(querySnapshot => {
          attendeesArray.length = 0;
          querySnapshot.forEach(doc => {
            attendeesArray.push(doc.data());
          });
          this.db.users.augmentNamesArray(attendeesArray, true);
        });
    }
  }

  unsubscribePending() {
    if (this.pendingUnsubscriber) {
      this.pendingUnsubscriber();
      this.pendingUnsubscriber = null;
    }
  }

  // pendingArray => array with fields
  //    str: user_id
  //    timestamp: joined
  //    str: status="pending"
  subscribePending(pendingArray, outing_id) {
    if (!this.pendingUnsubscriber) {
      this.pendingUnsubscriber = this.db.outings.outingsRef
        .doc(outing_id)
        .collection("attendees")
        .where("status", "==", "pending")
        .onSnapshot(querySnapshot => {
          pendingArray.length = 0;
          querySnapshot.forEach(doc => {
            pendingArray.push(doc.data());
          });
          this.db.users.augmentNamesArray(pendingArray);
        });
    }
  }

  unsubscribeGoing() {
    if (this.goingUnsubscriber) {
      this.goingUnsubscriber();
      this.goingUnsubscriber = null;
    }
  }

  // goingArray => array with fields
  //    str: user_id
  //    timestamp: joined
  //    str: status="going"
  subscribeGoing(goingArray, outing_id) {
    if (!this.goingUnsubscriber) {
      this.goingUnsubscriber = this.db.outings.outingsRef
        .doc(outing_id)
        .collection("attendees")
        .where("status", "==", "going")
        .onSnapshot(querySnapshot => {
          goingArray.length = 0;
          querySnapshot.forEach(doc => {
            goingArray.push(doc.data());
          });
          this.db.users.augmentNamesArray(goingArray, true);
        });
    }
  }
}

export default GroupsModel;
