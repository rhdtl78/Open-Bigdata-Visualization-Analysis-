var express = require("express");
var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "obva1234.appspot.com",
  databaseURL: "https://obva1234.firebaseio.com"
});

var db = admin.database();

module.exports = class Transaction {
  constructor(uid) {
    this.uid = uid;
    this.ref = db.ref(uid);
  }

  save(data, name, callback) {
    var escape = {
      "#": "&35;",
      "$": "&36;",
      ".": "&46;",
      "[": "&91;",
      "]": "&93;",
      "/": "&47;"
    };
    var object = [];
    for (let i = 0; i < data.length; i++) {
      object[i] = {};
      for (var key in data[i]) {
        if (data[i].hasOwnProperty(key)) {
          var newKey = key.replace(/[\.\#\$\[\]\/]/, function(x) {
            return escape[x];
          });
          object[i][newKey] = data[i][key];
        }
      }
    }

    if (name) {
      this.ref
        .child("saved")
        .child(name)
        .set({ date: Date.now() });
      object.forEach((item, index) => {
        this.ref
          .child("saved")
          .child(name)
          .child("data")
          .push(item);
      });
    } else {
      const ref = this.ref.child('tmp');
      ref.set({});
      object.forEach((item, index) => {
        ref
          .child("data")
          .push(item);
      });
      // this.ref.child('tmp').set({
      //   data: object
      // })
    }

    if (typeof callback == "function") callback();
  }

  load(name, callback) {
    var escape = {
      "&35;": "#",
      "&36;": "$",
      "&46;": ".",
      "&91;": "[",
      "&93;": "]",
      "&47;": "/"
    };
    const ref = (name !== "tmp") ? this.ref.child('saved').child(name) : this.ref.child("tmp");

    ref.once("value", (snapshot) => {
      var modified = [];
      var seriesArray = Object.values(snapshot.val().data);

      seriesArray.forEach(function(value, index) {
        modified[index] = {};
        for (var key in value) {
          if (value.hasOwnProperty(key)) {
            var newKey = key.replace(/&[0-9]+;/, function(x) {
              return escape[x];
            });
            modified[index][newKey] = value[key];
          }
        }
      });

      this.save(seriesArray);
      if (typeof callback == "function") {
        callback(modified);
      }
    });
  }

  list(callback) {
    this.ref.child('saved').once("value", function(snapshot) {
      var saveObj = snapshot.val();
      var saveList = [];
      for (var workName in saveObj) {
        saveList.push(workName);
      }

      if (typeof callback == "function") callback(saveList);
    });
  }

  delete(name) {
    var ref;
    if (name) {
      ref = this.ref.child(name);
    } else {
      ref = this.ref.child("tmp");
    }

    ref.set(null);
  }
};
