class OutingsModel {
  constructor(db) {
    this.db = db;
    this.outingsRef = db.dbRef.collection("Outings");
  }

  // lifecycle methods

  // creates outing, returns id of created outing
  async create(
    organizer_id,
    outing_title,
    location,
    datetime,
    desc,
    min_people = 2,
    max_people = 2,
    closed = false
  ) {
    const outing = {
      organizer_id: organizer_id,
      title: outing_title,
      location: location,
      datetime: datetime,
      desc: desc,
      min_people: min_people,
      max_people: max_people,
      closed: closed,
      deleted: false
    };
    const outingRef = await this.outingsRef.add(outing);
    return outingRef.id;
  }

  // updates the outing identified by outing_id with the values in the new_values dictionary
  async update(outing_id, new_values) {
    this.outingsRef.doc(outing_id).update(new_values);
  }

  // lazy deletion of outings object
  async delete(outing_id) {
    this.update(outing_id, { deleted: true });
  }

  // returns all event objects as a list of json objects
  async subscribeAll(outings) {
    this.outingsRef.where("deleted", "==", false).onSnapshot(querySnapshot => {
      outings.length = 0;
      querySnapshot.forEach(doc => {
        outings.push(doc.data());
      });
    });
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

export default OutingsModel;
