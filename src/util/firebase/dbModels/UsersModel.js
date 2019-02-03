class UsersModel {
  constructor(db) {
    this.db = db;
    this.usersRef = db.dbRef.collection("user");
    this.userOutingsUnsubscriber;
    this.myOutingsUnsubscriber;
  }

  getCurrentUserId() {
    return this.db.firebase.auth().currentUser.uid;
  }

  // adds names to usersArray
  async augmentNamesArray(usersArray, alphabetical = false) {
    const querySnapshot = await this.db.usersRef.get();
    for (var i = 0; i < usersArray.length; i++) {
      const name_data = querySnapshot.docs().find(doc => {
        doc.id === usersArray[i].id;
      });
      usersArray[i].firstName = name_data.firstName;
      usersArray[i].lastName = name_data.lastName;
    }
    if (alphabetical) {
      usersArray.sort(function(a, b) {
        const nameA = a.firstName.toLowerCase();
        const nameB = b.firstName.toLowerCase();
        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  async getName(user_id) {
    const snapshot = await this.usersRef.doc(user_id).get();
    return {
      user_id: user_id,
      firstName: snapshot.data().firstName,
      lastName: snapshot.data().lastName
    };
  }

  async makeOuting(outing_id, datetime) {
    const user_id = this.getCurrentUserId();
    this.usersRef
      .doc(user_id)
      .collection("myOutings")
      .doc(outing_id)
      .set({
        datetime: datetime
      });
  }

  unsubscribeMyOutings() {
    if (this.myOutingsUnsubscriber) {
      this.myOutingsUnsubscriber();
      this.myOutingsUnsubscriber = null;
    }
  }

  // eventsArray =>
  //    all events user i
  subscribeMyOutings(outingsArray) {
    const user_id = this.getCurrentUserId();
    if (!this.myOutingsUnsubscriber) {
      this.myOutingsUnsubscriber = this.usersRef
        .doc(user_id)
        .collection("myOutings")
        .orderBy("datetime")
        .limit(20)
        .onSnapshot(async querySnapshot => {
          outingsArray.length = 0;
          var promises = [];
          querySnapshot.forEach(doc => {
            promises.push(this.db.outings.outingsRef.doc(doc.id).get());
          });
          var outingsSnapshot = await Promise.all(promises);
          outingsSnapshot.forEach(doc => {
            outingsArray.push(doc.data());
          });
        });
    }
  }

  async setOuting(outing_id, user_id, status, datetime) {
    this.usersRef
      .doc(user_id)
      .collection("outings")
      .doc(outing_id)
      .set({
        status: status,
        datetime: datetime
      });
  }

  unsubscribeUserOutings() {
    if (this.userOutingsUnsubscriber) {
      this.userOutingsUnsubscriber();
      this.userOutingsUnsubscriber = null;
    }
  }

  // eventsArray =>
  //    all events user i
  subscribeUserOutings(outingsArray) {
    const user_id = this.getCurrentUserId();
    if (!this.userOutingsUnsubscriber) {
      this.userOutingsUnsubscriber = this.usersRef
        .doc(user_id)
        .collection("outings")
        .orderBy("datetime")
        .limit(20)
        .onSnapshot(async querySnapshot => {
          outingsArray.length = 0;
          var promises = [];
          var statuses = [];
          querySnapshot.forEach(doc => {
            promises.push(this.db.outings.outingsRef.doc(doc.id).get());
            statuses.push(doc.data().status);
          });
          const outingsSnapshot = await Promise.all(promises);
          outingsSnapshot.forEach((doc, i) => {
            var data = doc.data();
            data.status = statuses[i];
            (data.id = doc.id), outingsArray.push(data);
          });
        });
    }
  }
}

export default UsersModel;
