import firebase from "firebase";

class OutingsModel {
  constructor(db) {
    this.db = db;
    this.outingsRef = db.dbRef.collection("outings");
    this.allOutingsUnsubscriber;
    this.outingUnsubscribers = {};
    this.userOutingStatusUnsubscribers = {};
    this.userOutingData = {};
  }

  // creates outing, returns id of created outing
  async create() {
    const outing = {
      organizer_id: this.db.users.getCurrentUserId(),
      min_people: 2,
      max_people: 2,
      closed: false,
      deleted: false,
      available: false,
      going_count: 1
    };
    const outingRef = this.outingsRef.add(outing);
    outingRef.collection("attendees").add({
      user_id: this.db.users.getCurrentUserId(),
      joined: firebase.SesrverValue.TIMESTAMP,
      status: "going"
    });
    this.db.users.makeOuting(outingRef.id, undefined);
  }

  // updates the outing identified by outing_id with the values in the new_values dictionary
  async update(outing_id, new_values) {
    this.outingsRef.doc(outing_id).update(new_values);
    const snapshot = await this.outingsRef.doc(outing_id).get();
    var available = true;
    ["outing_title", "location", "datetime", "desc"].forEach(item => {
      available = available && item in snapshot.data();
    });
    this.outingsRef.doc(outing_id).update({ available: available });
  }

  // lazy deletion of outings object
  async delete(outing_id) {
    this.update(outing_id, { deleted: true });
  }

  unsubscribeAllOutings() {
    if (this.allOutingsUnsubscriber) {
      this.allOutingsUnsubscriber();
      this.allOutingsUnsubscriber = null;
    }
  }
  // returns all event objects as a list of json objects
  subscribeAllOutings(outingsArray) {
    if (!this.allOutingsUnsubscriber) {
      this.allOutingsUnsubscriber = this.outingsRef
        .where("deleted", "==", false)
        .where("available", "==", true)
        .orderBy("datetime")
        .onSnapshot(querySnapshot => {
          outingsArray.length = 0;
          querySnapshot.forEach(doc => {
            const data = doc.data();
            const outing = {
              id: doc.id,
              title: data.title,
              datetime: data.datetime
            };
            outingsArray.push(outing);
          });
        });
    }
  }

  async updateAllOutings() {
    const querySnapshot = await this.outingsRef.get();
    querySnapshot.forEach(async doc => {
      this.db.users.makeOuting(doc.id, doc.data().datetime);
      const attendees = await this.outingsRef.collection("attendees").get();
      attendees.forEach(doc => {
        this.db.users.setOuting(
          doc.id,
          doc.data().user_id,
          doc.data().status,
          doc.data().datetime
        );
      });
    });
  }

  unsubscribeOuting(outing_id) {
    if (outing_id in this.outingUnsubscribers) {
      this.outingUnsubscribers[outing_id]();
      delete this.outingUnsubscribers[outing_id];
    }
  }

  // returns all event objects as a list of json objects
  subscribeOuting(outing_id, onSnapshot) {
    if (!(outing_id in this.outingUnsubscribers)) {
      this.outingUnsubscribers[outing_id] = this.outingsRef
        .doc(outing_id)
        .onSnapshot(doc => {
          const data = doc.data();
          onSnapshot(data);
        });
    }
  }

  unsubscribeUserOutingStatus(outing_id) {
    if (outing_id in this.userOutingStatusUnsubscribers) {
      this.userOutingStatusUnsubscribers[outing_id].forEach(func => {
        func();
      });
      delete this.userOutingStatusUnsubscribers[outing_id];
      delete this.userOutingData[outing_id];
    }
  }

  subscribeUserOutingStatus(outing_id, OnSnapshot) {
    const user_id = this.db.users.getCurrentUserId();
    if (!this.userOutingData[outing_id]) {
      this.userOutingData[outing_id] = {};
    }
    const decision = (outing_id) => {
      if (Object.keys(this.userOutingData[outing_id]).length === 3) {
        const userStatus = this.userOutingData[outing_id].userStatus;
        const closedOuting = this.userOutingData[outing_id].closedOuting;
        const outingFull = this.userOutingData[outing_id].outingFull;
        if (userStatus === "going") {
          OnSnapshot("GOING");
        } else if (!closedOuting && !outingFull) {
          OnSnapshot("AVAILABLE");
        } else if (userStatus === "pending") {
          if (closedOuting) {
            OnSnapshot("PENDING");
          } else {
            OnSnapshot("WAITLIST JOINED");
          }
        } else {
          OnSnapshot("WAITLIST AVAILABLE");
        }
      }
    };
    if (!(outing_id in this.userOutingStatusUnsubscribers)) {
      this.userOutingStatusUnsubscribers[outing_id] = [];
      this.userOutingStatusUnsubscribers[outing_id].push(
        this.outingsRef.doc(outing_id).onSnapshot(querySnapshot => {
          this.userOutingData[outing_id].outingFull =
            querySnapshot.data().max_people <= querySnapshot.data().going_count;
          this.userOutingData[
            outing_id
          ].closedOuting = querySnapshot.data().closed;
          decision(outing_id);
        })
      );
      this.userOutingStatusUnsubscribers[outing_id].push(
        this.outingsRef
          .doc(outing_id)
          .collection("attendees")
          .where("user_id", "==", user_id)
          .onSnapshot(querySnapshot => {
            if (querySnapshot.empty) {
              this.userOutingData[outing_id].userStatus = "";
            } else {
              this.userOutingData[outing_id].userStatus =
                querySnapshot.data().status;
            }
            decision(outing_id);
          })
      );
    }
  }

  // returns the max status a user is allowed for an event
  async canAddUser(outing_id, user_id, allowed = false) {
    const querySnapshot = await this.outingsRef.doc(outing_id).get();
    const outingFull =
      querySnapshot.data().max_people <= querySnapshot.data().going_count;
    const userStatus = await this.db.groups.getUserStatus(outing_id, user_id);
    const closedOuting = querySnapshot.data().closed;
    if ((!closedOuting || allowed) && userStatus != "going" && !outingFull) {
      this.outingsRef.doc(outing_id).update({
        going_count: querySnapshot.data().going_count + 1
      });
      this.db.users.setOuting(
        outing_id,
        user_id,
        "going",
        querySnapshot.data().datetime
      );
      return "going";
    } else if (!userStatus) {
      this.db.users.setOuting(
        outing_id,
        user_id,
        "pending",
        querySnapshot.data().datetime
      );
      return "pending";
    } else {
      return "";
    }
  }
}

export default OutingsModel;
