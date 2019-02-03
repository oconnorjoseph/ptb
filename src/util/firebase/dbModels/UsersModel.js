class UsersModel {
  constructor(db) {
    this.db = db;
    this.usersRef = this.db.collection("users");
    this.userEventsUnsubscriber;
  }

  // adds names to usersArray
  async augmentNamesArray(usersArray, alphabetical = false) {
    const querySnapshot = await this.usersRef.get();
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
  //    all events user is
  /*
  subscribeUserEvents(eventsArray, user_id) {
    const querySnapshot = this.usersRef
      .doc(user_id)
      .collection("events")
      .onSnapshot(querySnapshot => {
        for (var i = 0; i < usersArray.length; i++) {
          const name_data = querySnapshot.docs().find(doc => {
            doc.id == usersArray[i].id;
          });
          usersArray[i].firstName = name_data.firstName;
          usersArray[i].lastName = name_data.lastName;
        }
      });

    if (!this.userEventsUnsubscriber) {
      this.userEventsUnsubscriber = this.usersRef
        .where("deleted", "==", false)
        .orderBy("datetime")
        .onSnapshot(querySnapshot => {
          eventsArray.length = 0;
          querySnapshot.forEach(doc => {
            const data = doc.data();
            const outing = {
              id: doc.id,
              title: data.title,
              datetime: data.datetime
            };
            eventsArray.push(outing);
          });
        });
    }
  }*/
}

export default UsersModel;
