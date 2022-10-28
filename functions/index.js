const functions = require("firebase-functions");
const admin = require("firebase-admin");

const serviceAccount = require("./apiKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const usersRef = db.collection("users");

exports.createUser = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { name, unit, emtlevel, rank, email, password, token } = data;
      return admin
        .auth()
        .verifyIdToken(token)
        .then((claims) => {
          if (claims.isAdmin === true) {
            let userData = {
              name: name,
              emtlevel: emtlevel,
              rank: rank,
              unit: unit,
            };
            return admin
              .auth()
              .createUser({
                email: email,
                password: password,
              })
              .then((userRecord) => {
                return usersRef
                  .doc(userRecord.uid)
                  .set(userData)
                  .then(() => {
                    return {
                      message:
                        "Successfully created new user:" + userRecord.uid,
                      result: 200,
                    };
                  })
                  .catch((error) => {
                    throw new functions.https.HttpsError(
                      502,
                      "Error creating new doc:",
                      error
                    );
                  });
              })
              .catch((error) => {
                throw new functions.https.HttpsError(
                  501,
                  "Error creating new user:",
                  error
                );
              });
          } else {
            throw new functions.https.HttpsError(
              500,
              "Not Admin can't access",
              error
            );
          }
        });
    }
  });

exports.getUsers = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { token, unit } = data;
      return admin
        .auth()
        .verifyIdToken(token)
        .then(async (claims) => {
          if (claims.isAdmin === true) {
            console.log("是管理員");
            const snapshot = await usersRef.where("unit", "==", unit).get();
            let data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log(data);
            return {
              message: "Successfully fetch users:",
              result: 200,
              data: data,
            };
          } else {
            throw new functions.https.HttpsError(
              500,
              "Not Admin can't access",
              error
            );
          }
        })
        .catch((error) => {
          throw new functions.https.HttpsError(
            500,
            "verifyIdToken process fail",
            error
          );
        });
    }
  });

exports.deleteUser = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { uid, token } = data;
      return admin
        .auth()
        .verifyIdToken(token)
        .then(async (claims) => {
          if (claims.isAdmin === true) {
            await admin.auth().deleteUser(uid);
            await usersRef.doc(uid).delete();
            return {
              message: "Successfully delete user:" + uid,
              result: 200,
            };
          } else {
            throw new functions.https.HttpsError(
              500,
              "Not Admin can't access",
              error
            );
          }
        });
    }
  });

exports.updateUser = functions
  .region("asia-east1")
  .https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { token, name, unit, emtlevel, rank, userId } = data;
      return admin
        .auth()
        .verifyIdToken(token)
        .then((claims) => {
          let userData = {
            name: name,
            emtlevel: emtlevel,
            rank: rank,
            unit: unit,
          };
          if (claims.isAdmin === true) {
            return usersRef
              .doc(userId)
              .update(userData)
              .then(() => {
                return {
                  message: "Successfully update user:" + userId,
                  result: 200,
                };
              })
              .catch(() => {
                throw new functions.https.HttpsError(
                  "failed-execute",
                  "fail at updating doc",
                  error
                );
              });
          } else {
            throw new functions.https.HttpsError(
              "failed-execute",
              "Not Admin can't access",
              error
            );
          }
        });
    }
  });

// Firefighters
const getCollectionId = async (collection_name) => {
  var id;
  await db
    .collection(collection_name)
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        id = doc.id;
      });
    });
  return id;
};

exports.createFirefighter = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { name, unit, token } = data;
      return admin
        .auth()
        .verifyIdToken(token)
        .then(async (claims) => {
          if (claims.isAdmin === true) {
            let firefighterData = {
              name: name,
            };
            const unitId = await getCollectionId(unit);
            return db
              .collection(unit + "/" + unitId + "/firefighters")
              .add(firefighterData)
              .then(() => {
                return {
                  message: "Successfully add firefighter:" + name,
                  result: 200,
                };
              })
              .catch(() => {
                throw new functions.https.HttpsError(
                  500,
                  "create new doc fail",
                  error
                );
              });
          } else {
            throw new functions.https.HttpsError(
              500,
              "Not Admin can't access",
              error
            );
          }
        });
    }
  });

exports.getFirefighters = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { token, unit } = data;
      return admin
        .auth()
        .verifyIdToken(token)
        .then(async (claims) => {
          if (claims.isAdmin === true) {
            console.log("是管理員");
            const unitId = await getCollectionId(unit);
            const snapshot = await db
              .collection(unit + "/" + unitId + "/firefighters")
              .get();
            let data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log(data);
            return {
              message: "Successfully fetch firefighters",
              result: 200,
              data: data,
            };
          } else {
            throw new functions.https.HttpsError(
              500,
              "Not Admin can't access",
              error
            );
          }
        })
        .catch((error) => {
          throw new functions.https.HttpsError(
            500,
            "verifyIdToken process fail",
            error
          );
        });
    }
  });

exports.deleteFirefighter = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { uid, unit, token } = data;
      return admin
        .auth()
        .verifyIdToken(token)
        .then(async (claims) => {
          if (claims.isAdmin === true) {
            const unitId = await getCollectionId(unit);
            await db
              .collection(unit + "/" + unitId + "/firefighters")
              .doc(uid)
              .delete();
            return {
              message: "Successfully delete firefighter:" + uid,
              result: 200,
            };
          } else {
            throw new functions.https.HttpsError(
              500,
              "Not Admin can't access",
              error
            );
          }
        });
    }
  });

exports.updateFirefighter = functions
  .region("asia-east1")
  .https.onCall((data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { token, name, unit, userId } = data;
      return admin
        .auth()
        .verifyIdToken(token)
        .then(async (claims) => {
          let firefighterData = {
            name: name,
          };
          if (claims.isAdmin === true) {
            const unitId = await getCollectionId(unit);
            return db
              .collection(unit + "/" + unitId + "/firefighters")
              .doc(userId)
              .update(firefighterData)
              .then(() => {
                return {
                  message: "Successfully update firefighterData:" + userId,
                  result: 200,
                };
              })
              .catch(() => {
                throw new functions.https.HttpsError(
                  "failed-execute",
                  "fail at updating doc",
                  error
                );
              });
          } else {
            throw new functions.https.HttpsError(
              "failed-execute",
              "Not Admin can't access",
              error
            );
          }
        });
    }
  });

exports.verifyAdmin = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    }
    const { token } = data;
    return admin
      .auth()
      .verifyIdToken(token)
      .then(async (claims) => {
        if (claims.isAdmin === true) {
          let data = await usersRef.doc(context.auth.uid).get();
          return {
            result: 200,
            message: "success verify Admin: " + context.auth.uid,
            data: data.data(),
          };
        } else {
          let data = await usersRef.doc(context.auth.uid).get();
          return {
            result: 400,
            message: "Fail to verify Admin: " + context.auth.uid,
            data: data.data(),
          };
        }
      })
      .catch((error) => {
        throw new functions.https.HttpsError("failed-execute", error);
      });
  });

// admin create read
exports.createAdmin = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { unitCh, unitEng, token } = data;
      return admin
        .auth()
        .verifyIdToken(token)
        .then(async (claims) => {
          if (
            claims.isAdmin === true &&
            claims.uid === "R3S5c6JQEWZzVDGqMXCGCV2bNrg1"
          ) {
            let userData = {
              name: "01",
              emtlevel: "TP",
              rank: "承辦警消",
              unit: unitCh,
            };
            return admin
              .auth()
              .createUser({
                email: unitEng + "119@gmail.com",
                password: "a119119",
              })
              .then(async (userRecord) => {
                console.log("創建帳號完畢");
                return admin
                  .auth()
                  .setCustomUserClaims(userRecord.uid, { isAdmin: true })
                  .then(() => {
                    console.log("開啟權限完畢");
                    return db
                      .collection("users")
                      .doc(userRecord.uid)
                      .set(userData)
                      .then(() => {
                        return db
                          .collection(unitEng)
                          .doc("subcollections")
                          .collection("fireFighters")
                          .add({})
                          .then(() => {
                            return {
                              message:
                                "Successfully created new admin & unit:" +
                                unitEng,
                              result: 200,
                            };
                          });
                      })
                      .catch((error) => {
                        throw new functions.https.HttpsError(
                          502,
                          "Error creating new doc:" + unitEng,
                          error
                        );
                      });
                  })
                  .catch((error) => {
                    throw new functions.https.HttpsError(
                      501,
                      "Error setCustomUserClaims:" + unitEng,
                      error
                    );
                  });
              })
              .catch((error) => {
                throw new functions.https.HttpsError(
                  501,
                  "Error creating new admin:" + unitEng,
                  error
                );
              });
          } else {
            throw new functions.https.HttpsError(
              500,
              "Not YunChien can't access" + unitEng,
              error
            );
          }
        });
    }
  });

exports.getAdmins = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { token } = data;
      return admin
        .auth()
        .verifyIdToken(token)
        .then(async (claims) => {
          if (
            claims.isAdmin === true &&
            claims.uid === "R3S5c6JQEWZzVDGqMXCGCV2bNrg1"
          ) {
            return admin
              .auth()
              .listUsers(1000)
              .then((userRecords) => {
                // let adminList = userRecords.users.map((user) => {
                //   return user.customClaims;
                // });
                let adminList = userRecords.users.filter((user) => {
                  return user.customClaims != null;
                });
                return {
                  message: "Successfully fetch admins",
                  result: 200,
                  data: adminList,
                };
              })
              .catch((error) => {
                throw new functions.https.HttpsError(
                  500,
                  "Not YunChien can't access",
                  error
                );
              });
          } else {
            throw new functions.https.HttpsError(
              500,
              "Not YunChien can't access",
              error
            );
          }
        });
    }
  });

exports.setAdmin = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { uid, token } = data;
      return admin
        .auth()
        .verifyIdToken(token)
        .then(async (claims) => {
          if (
            claims.isAdmin === true &&
            claims.uid === "R3S5c6JQEWZzVDGqMXCGCV2bNrg1"
          ) {
            return admin
              .auth()
              .setCustomUserClaims(uid, { isAdmin: true })
              .then(() => {
                return {
                  message: "Successfully set " + uid + " admin",
                  result: 200,
                };
              });
          } else {
            throw new functions.https.HttpsError(
              500,
              "Not YunChien can't access",
              error
            );
          }
        });
    }
  });
// server msg record
