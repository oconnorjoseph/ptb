class GroupsModel {
  constructor(db) {
    this.db = db;
    this.userStatusUnsubscriber;
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
  subscribeUserStatus(userStatusObj, outing_id, user_id) {
    if (!this.userStatusUnsubscriber) {
      this.userStatusUnsubscriber = this.outingsRef
        .doc(outing_id)
        .collection("attendees")
        .where("user_id", "==", user_id)
        .onSnapshot(querySnapshot => {
          if (querySnapshot.empty) {
            userStatusObj.status = "";
          } else {
            userStatusObj.status = querySnapshot.data().status;
          }
        });
    }
  }

  // adds user to pending list for a closed outing, going if open
  async addUser(outing_id, user_id) {
    const outing = await this.db.outings.fetch(outing_id);
    this.db.outings
      .doc(outing_id)
      .collection("attendees")
      .add({
        user_id: user_id,
        joined: this.db.FieldValue.serverTimestamp(),
        status: outing.closed ? "pending" : "going"
      });
  }

  // confirms user from pending to going for a closed outing
  async confirmUser(outing_id, user_id) {
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
      this.attendeesUnsubscriber = this.outingsRef
        .doc(outing_id)
        .collection("attendees")
        .onSnapshot(querySnapshot => {
          attendeesArray.length = 0;
          querySnapshot.forEach(doc => {
            attendeesArray.push(doc.data());
          });
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
      this.pendingUnsubscriber = this.outingsRef
        .doc(outing_id)
        .collection("attendees")
        .where("status", "==", "pending")
        .onSnapshot(querySnapshot => {
          pendingArray.length = 0;
          querySnapshot.forEach(doc => {
            pendingArray.push(doc.data());
          });
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
      this.goingUnsubscriber = this.outingsRef
        .doc(outing_id)
        .collection("attendees")
        .where("status", "==", "going")
        .onSnapshot(querySnapshot => {
          goingArray.length = 0;
          querySnapshot.forEach(doc => {
            goingArray.push(doc.data());
          });
        });
    }
  }
}

export default GroupsModel;