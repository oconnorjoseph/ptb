class OutingsModel {
  constructor(db) {
    this.db = db;
    this.outingsRef = db.dbRef.collection("Outings");
  }

  // lifecycle methods
  async create() {}

  async update() {}

  async delete() {}

  // fetch methods
  async fetchAll() {
    const snapshot = await this.outingsRef.get();
    var outings = [];
    snapshot.forEach(doc => {
      outings.push(doc.data());
    });
    return outings;
  }

  async fetch(event_id) {
    snapshot = await this.outingsRef.doc(event_id).get();
    if (doc.exists) {
      return doc.data();
    } else {
      return null;
    }
  }

  // methods
}

export default OutingsModel;
