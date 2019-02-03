class UsersModel {
  constructor(db) {
    this.db = db;
    this.usersRef = db.dbRef.collection("user");
    this.userOutingsUnsubscriber;
  }

  // adds names to usersArray
  async augmentNamesArray(usersArray, alphabetical = false) {
    const querySnapshot = await this.db.usersRef.get();
    for (var i = 0; i < usersArray.length; i++) {
      const name_data = querySnapshot.docs().find(doc => {
        doc.id == usersArray[i].id;
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

  unsubscribeUserEvents() {
    if (this.userEventsUnsubscriber) {
      this.userEventsUnsubscriber();
      this.userEventsUnsubscriber = null;
    }
  }

  // eventsArray =>
  //    all events user i
  subscribeUserOutings(outingsArray, user_id) {
    if (!this.userOutingsUnsubscriber) {
      this.userOutingsUnsubscriber = this.usersRef
        .doc(user_id)
        .collection("outings")
        .sortBy("datetime")
        .limit(20)
        .onSnapshot(async querySnapshot => {
          outingsArray.length = 0;
          var promises = [];
          querySnapshot.forEach(doc => {
            promises.push(this.db.outingsRef.doc(doc.id).get());
          });
          const outingsSnapshot = await Promise.all(promises);
          outingsSnapshot.forEach(doc => {
            outingsArray.push(doc.data());
          });
        });
    }
  }
}

export default UsersModel;
