class GroupsModel {
  constructor(db) {
    this.db = db;
  }
/*
  async checkUser(outing_id, user_id) {
    const snapshot = await this.db.outings
      .doc(outing_id)
      .collection("attendees")
      .where("user_id", "==", user_id)
      .get();
  }*/

  // adds user to pending list for a closed outing, going if open
  async addUser(outing_id, user_id) {
    const outing = await this.db.outings.fetch(outing_id);
    if (outing[closed]) {
      this.db.outings
        .doc(outing_id)
        .collection("pending")
        .add({
          user_id: user_id,
          joined: Date.now()
        });
    } else {
        this.db.outings
        .doc(outing_id)
        .collection("going")
        .add({
          user_id: user_id,
          joined: Date.now()
        });
    }
  }

  // fetch methods

  // returns all event objects as a list of json objects
  async fetchAll() {
    const snapshot = await this.outingsRef.where("deleted", "==", false).get();
    var outings = [];
    snapshot.forEach(doc => {
      outings.push(doc.data());
    });
    return outings;
  }

  // returns a single json object for the event-id provided, returns null if not present
  async fetch(event_id) {
    const snapshot = await this.outingsRef.doc(event_id).get();
    if (snapshot.exists) {
      const outing = snapshot.data();
      return outing.deleted ? null : outing;
    } else {
      return null;
    }
  }

  // methods
}

export default GroupsModel;
