class OutingsModel {
  constructor(db) {
    this.db = db;
    this.outingsRef = db.dbRef.collection("outings");
    this.allOutingsUnsubscriber;
    this.outingUnsubscriber;
  }

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
      going_count: 1,
      deleted: false
    };
    const outingRef = await this.outingsRef.add(outing);
    outingRef.collection("attendees").add({
      uid: organizer_id,
      joined: this.db.FieldValue.serverTimestamp(),
      status: "going"
    });
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


  unsubscribeAllOutings() {
    if (this.allOutingsUnsubscriber) {
      this.allOutingsUnsubscriber();
      this.allOutingsUnsubscriber = null;
    }
  }
  // returns all event objects as a list of json objects
  async subscribeAllOutings(outingsArray) {
    if (!this.allOutingsUnsubscriber) {
      this.allOutingsUnsubscriber = this.outingsRef
        .where("deleted", "==", false)
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
            console.log(outing);
            outingsArray.push(outing);
          });
        });
    }
  }


  unsubscribeOuting() {
    if (this.outingUnsubscriber) {
      this.outingUnsubscriber();
      this.outingUnsubscriber = null;
    }
  }

  // returns all event objects as a list of json objects
  async subscribeOuting(outingObj, outing_id) {
    if (!this.outingUnsubscriber) {
      this.outingUnsubscriber = this.outingsRef
        .doc(outing_id)
        .onSnapshot(querySnapshot => {
          outingObj = querySnapshot.data();
          outingObj.id = outing_id;
        });
    }
  }

  // returns the max status a user is allowed for an event
  async canAddUser(outing_id, user_id, allowed=false) {
    const querySnapshot = await this.outingsRef.doc(outing_id).get();
    const outingFull = querySnapshot.data().max_people >= querySnapshot.data().going_count;
    const userStatus = await this.db.groups.getUserStatus(outing_id, user_id);
    const closedOuting = querySnapshot.data().closed;
    if ((!closedOuting || allowed) && userStatus != "going" && !outingFull) {
      this.outingsRef.doc(outing_id).update({
        going_count: querySnapshot.data().going_count + 1
      });
      return "going";
    } else if (!userStatus) {
      return "pending";
    } else {
      return "";
    }
  }
}

export default OutingsModel;
