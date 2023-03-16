const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("firebase-functions/logger/compat");
const serviceAccount = require("./apiKey.json");
const { unitNameEnum } = require("./Enum");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const casesRef = db.collection("cases");
const usersRef = db.collection("users");
const allStatsRef = db.collection("allStats");

// search api
// exports.queryTargetCases = functions.https.onRequest((req, res) => {
//   const { subject, value } = req.body;
//   casesRef
//     .orderBy("time", "desc")
//     .where(subject, "==", value)
//     .get()
//     .then((snapshot) => {
//       let stuff = [];
//       snapshot.forEach((doc) => {
//         stuff = stuff.concat(doc.data());
//       });
//       res.send(stuff);
//       return "";
//     });
// });

exports.loginUser = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { array } = data;
      console.log(array);
    }
  });

  exports.logOutUser = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { array } = data;
      console.log(array);
    }
  });

exports.queryTargetCases = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { subject, value } = data;
      return casesRef
        .orderBy("time", "desc")
        .where(subject, "==", value)
        .get()
        .then((querySnapshot) => {
          let arr = [];
          querySnapshot.forEach((doc) => {
            arr.push({
              id: doc.id,
              time: doc.data().time,
              unit: doc.data().unit,
              emtlevel: doc.data().emtlevel,
              who: doc.data().who,
              uid: doc.data().uid,
              rank: doc.data().rank,
              patient: doc.data().patient,
              onScene: doc.data().onScene,
              treatment: doc.data().treatment,
              selectedParts: doc.data().selectedParts,
              vital: doc.data().vital,
              tp: doc.data().tp,
              location: doc.data().location,
              otherContent: doc.data().otherContent,
              hospital: doc.data().hospital,
            });
          });
          return {
            message: "Successfully search case",
            result: 200,
            data: JSON.stringify(arr),
          };
        })
        .catch((error) => {
          console.error("Error searching case: ", error);
          return {
            message: "Error searching case",
            result: 500,
          };
        });
    }
  });

exports.queryOtherContentCases = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { value } = data;
      const OtherContentCasesPromise = casesRef.orderBy("time", "desc").get();

      return OtherContentCasesPromise.then((querySnapshot) => {
        var targetCases = [];
        querySnapshot.forEach((item) => {
          if (item.data().otherContent?.indexOf(value) >= 0) {
            targetCases.push(item.data());
          }
        });
        return {
          message: "Successfully search case",
          result: 200,
          data: targetCases,
        };
      }).catch((err) => {
        console.log(err);
        throw new functions.https.HttpsError(
          "500",
          "queryOtherContentCases fail",
          err
        );
      });
    }
  });

exports.querySpecArrayCases = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { array } = data;
      console.log(array);
    }
  });

exports.querySpecArrayCases2 = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { array } = data;
      console.log(array);
      return casesRef
        .where("onScene", "in", [["非交通事故", "其他非創傷機轉"]])
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.data());
          });
        })
        .catch((err) => {
          console.error(err);
        });

      // return SpecArrayCasesPromise.then((cases) => {

      // }).catch((err) => {
      //   console.log(err);
      //   throw new functions.https.HttpsError(
      //     "500",
      //     "querySpecArrayCases fail",
      //     err
      //   );
      // });
    }
  });

exports.queryTimePeriodCases = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { start, end, unit } = data;
      console.log(start, end, unit);
      if (unit != undefined) {
        console.log("ssssssss");
        return casesRef
          .orderBy("time", "desc")
          .where("unit", "==", unit)
          .where("time", ">=", start)
          .where("time", "<", end)
          .get()
          .then((querySnapshot) => {
            let arr = [];
            querySnapshot.forEach((doc) => {
              arr.push({
                id: doc.id,
                time: doc.data().time,
                unit: doc.data().unit,
                emtlevel: doc.data().emtlevel,
                who: doc.data().who,
                uid: doc.data().uid,
                rank: doc.data().rank,
                patient: doc.data().patient,
                onScene: doc.data().onScene,
                treatment: doc.data().treatment,
                selectedParts: doc.data().selectedParts,
                vital: doc.data().vital,
                tp: doc.data().tp,
                location: doc.data().location,
                otherContent: doc.data().otherContent,
                hospital: doc.data().hospital,
              });
            });
            return {
              message: "Successfully search case",
              result: 200,
              data: JSON.stringify(arr),
            };
          })
          .catch((error) => {
            console.error("Error searching case: ", error);
            return {
              message: "Error searching case",
              result: 500,
            };
          });
      } else {
        return casesRef
          .orderBy("time", "desc")
          .where("time", ">=", start)
          .where("time", "<", end)
          .get()
          .then((querySnapshot) => {
            let arr = [];
            querySnapshot.forEach((doc) => {
              arr.push({
                id: doc.id,
                time: doc.data().time,
                unit: doc.data().unit,
                emtlevel: doc.data().emtlevel,
                who: doc.data().who,
                uid: doc.data().uid,
                rank: doc.data().rank,
                patient: doc.data().patient,
                onScene: doc.data().onScene,
                treatment: doc.data().treatment,
                selectedParts: doc.data().selectedParts,
                vital: doc.data().vital,
                tp: doc.data().tp,
                location: doc.data().location,
                otherContent: doc.data().otherContent,
                hospital: doc.data().hospital,
              });
            });
            return {
              message: "Successfully search case",
              result: 200,
              data: JSON.stringify(arr),
            };
          })
          .catch((error) => {
            console.error("Error searching case: ", error);
            return {
              message: "Error searching case",
              result: 500,
            };
          });
      }
    }
  });

// Case api
exports.createCase = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { caseData } = data;
      return casesRef
        .add(caseData)
        .then((docRef) => {
          return {
            message: "Successfully created new case:" + docRef.id,
            result: 200,
          };
        })
        .catch((error) => {
          console.error("Error adding case: ", error);
          return {
            message: "Error created new case",
            result: 500,
          };
        });
    }
  });

exports.getCase = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { caseId } = data;
      return casesRef
        .doc(caseId)
        .get()
        .then((res) => {
          return {
            message: "Successfully get case:" + caseId,
            result: 200,
            data: res.data(),
          };
        })
        .catch((error) => {
          console.error("Error getting case: ", error);
          return {
            message: "Error created new case",
            result: 500,
          };
        });
    }
  });

exports.deleteCase = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { caseId } = data;
      return casesRef
        .doc(caseId)
        .delete()
        .then(() => {
          return {
            message: "Successfully delete case: " + caseId,
            result: 200,
          };
        })
        .catch((error) => {
          console.error("Error delete case: ", error);
          return {
            message: "Error created new case",
            result: 500,
          };
        });
    }
  });

exports.updateCase = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      console.log("進入更新函數");
      const { caseData, caseId } = data;
      console.log("caseData", "");
      return casesRef
        .doc(caseId)
        .update(caseData)
        .then(() => {
          return {
            message: "Successfully updateCase :" + caseId,
            result: 200,
          };
        })
        .catch((error) => {
          console.error("Error adding case: ", error);
          return {
            message: "Error created new case",
            result: 500,
          };
        });
    }
  });

exports.getCases = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { quantity } = data;
      return casesRef
        .orderBy("time", "desc")
        .limit(quantity)
        .get()
        .then((querySnapshot) => {
          return {
            message: "Successfully fetch Cases",
            result: 200,
            data: querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          };
        })
        .catch((err) => {
          return err;
        });
    }
  });

// User api

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
        })
        .catch((error) => {
          throw new functions.https.HttpsError(
            501,
            "you 're not even user can't access , createUser",
            error
          );
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
            const snapshot = await usersRef.where("unit", "==", unit).get();
            let data = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
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

exports.getUser = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { token, uid } = data;
      return admin
        .auth()
        .verifyIdToken(token)
        .then(async (claims) => {
          if (claims.isAdmin === true) {
            const res = usersRef
              .doc(uid)
              .get()
              .then((doc) => {
                if (doc.exists) {
                  console.log("Document data:", doc.data());
                  return {
                    message: "Successfully fetch users: " + uid,
                    result: 200,
                    data: doc.data(),
                  };
                } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
                }
              })
              .catch((error) => {
                console.log("Error getting document:", error);
              });
            return res;
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
            const userExist = await admin
              .auth()
              .getUser(uid)
              .then(() => {
                return true;
              })
              .catch(() => {
                return false;
              });
            if (userExist) {
              await admin.auth().deleteUser(uid);
            }
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

//firefighter api

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
            // const unitId = await getCollectionId(unit);
            // console.log("unitId"+ unitId)
            return db
              .collection(unit + "/" + "unitFolder" + "/firefighters")
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
          // if (claims.isAdmin === true) {
          // const unitId = await getCollectionId(unit);
          const snapshot = await db
            .collection(unit + "/" + "unitFolder" + "/firefighters")
            .get();
          let data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          return {
            message: "Successfully fetch firefighters",
            result: 200,
            data: data,
          };
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
            // const unitId = await getCollectionId(unit);
            await db
              .collection(unit + "/" + "unitFolder" + "/firefighters")
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
            // const unitId = await getCollectionId(unit);
            return db
              .collection(unit + "/" + "unitFolder" + "/firefighters")
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
                        console.log("create userRecord.uid");
                        // 此段以下出錯 認不得 我的collection
                        return db
                          .collection(unitEng)
                          .doc("unitFolder")
                          .collection("firefighters")
                          .add({ name: "測試" })
                          .then(async (obj) => {
                            console.log("create firefighters folder");
                            const unitId = obj.path.split("/")[1];
                            db.collection(unitEng)
                              .doc(unitId)
                              .collection("unitStats")
                              .doc("unitStatsCollection")
                              .collection("week")
                              .add({});
                            db.collection(unitEng)
                              .doc(unitId)
                              .collection("unitStats")
                              .doc("unitStatsCollection")
                              .collection("month")
                              .add({});
                            db.collection(unitEng)
                              .doc(unitId)
                              .collection("unitStats")
                              .doc("unitStatsCollection")
                              .collection("2month")
                              .add({});

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
// sendType : intruder , user , admin , senior-admin
// const serverRecord = (token, msg, isBug) => {
//   let recordData = {
//     uid: "",
//     msg: msg,
//     isBug: isBug,
//     time: new Date(),
//   };
//   admin
//     .auth()
//     .verifyIdToken(token)
//     .then((claims) => {
//       recordData.uid = claims.uid;
//       if (
//         claims.isAdmin === true &&
//         claims.uid !== "R3S5c6JQEWZzVDGqMXCGCV2bNrg1"
//       ) {
//         recordData.sendType = "admin";
//       } else if (
//         claims.isAdmin === true &&
//         claims.uid == "R3S5c6JQEWZzVDGqMXCGCV2bNrg1"
//       ) {
//         recordData.sendType = "senior-admin";
//       } else {
//         recordData.sendType = "user";
//       }
//       recordRef.add(recordData);
//       console.log(recordData, "recordData");
//     })
//     .catch(() => {
//       recordRef.add(recordData);
//       recordData.uid = "not autherize user";
//       recordData.sendType = "intruder";
//     });
// };

const missionStatsByPersonal = (cases) => {
  let ResultStats = {
    //總排名
    missionStatsByAllPersonal: [],
    missionStatsByAllUnit: [],
    //隊排名
    missionStatsByUnitPersonal: [],
  };
  let missionStatsAll = [];
  cases.forEach((el) => {
    if (missionStatsAll.find((e) => e.uid == el.uid)) {
      let obj = missionStatsAll.find((e) => {
        return e.uid === el.uid;
      });
      obj.missionNum += 1;
      // console.log("此案執行人員已造冊");
      // 此案執行人員已造冊
    } else {
      // 此案執行人員未曾出現過
      missionStatsAll.push({
        unit: el.unit,
        name: el.who,
        uid: el.uid,
        missionNum: 1,
      });
      // console.log("此案執行人員未造冊", missionStatsAll);
    }
  });
  // missionStatsAll 即是 三大所有人 的勤務數量表
  // 按照分隊歸類成 一個 Array 再跑一次 即可得到各分隊 排名
  let missionStatsSortByUnit = {};
  missionStatsAll.forEach((person) => {
    let thisPersonsUnit = person.unit;
    if (person.unit in missionStatsSortByUnit) {
      missionStatsSortByUnit[thisPersonsUnit].push(person);
    } else {
      missionStatsSortByUnit[thisPersonsUnit] = [];
      missionStatsSortByUnit[thisPersonsUnit].push(person);
    }
  });
  // console.log("按照分隊 分出 個人統計結果", missionStatsSortByUnit);

  Object.keys(missionStatsSortByUnit).forEach((key) => {
    missionStatsSortByUnit[key] = missionNumTopN(
      missionStatsSortByUnit[key],
      3
    );
  });
  // console.log("各分隊 救護前三名", missionStatsSortByUnit);
  ResultStats.missionStatsByUnitPersonal = missionStatsSortByUnit;

  // console.log("三大 個人 救護前三名: ", missionNumTopN(missionStatsAll, 3));
  ResultStats.missionStatsByAllPersonal = missionNumTopN(missionStatsAll, 3);

  let missionStatsByUnit = [];
  missionStatsAll.forEach((person) => {
    if (missionStatsByUnit.find((e) => e.unit == person.unit)) {
      let obj = missionStatsByUnit.find((e) => {
        return e.unit == person.unit;
      });
      obj.missionNum += person.missionNum;
    } else {
      missionStatsByUnit.push({
        unit: person.unit,
        missionNum: person.missionNum,
      });
    }
  });
  ResultStats.missionStatsByAllUnit = missionNumTopN(missionStatsByUnit, 3);

  // console.log("三大各分隊 統計結果: ", missionNumTopN(missionStatsByUnit, 3));
  return ResultStats;
};

const missionNumTopN = (arr, n) => {
  return arr
    .slice()
    .sort((a, b) => {
      return b.missionNum - a.missionNum;
    })
    .slice(0, n);
};

const onSceneStats = (cases) => {
  let result = {
    onSceneStatsAll: {},
    onSceneStatsByUnit: {},
  };
  result.onSceneStatsByUnit = {};
  cases.forEach((Case) => {
    if (Case.unit in result.onSceneStatsByUnit) {
      // console.log("此分隊已造冊");
    } else {
      result.onSceneStatsByUnit[Case.unit] = {};
      // console.log("此分隊未造冊");
    }
    Case.onScene.forEach((el) => {
      if (el in result.onSceneStatsByUnit[Case.unit]) {
        result.onSceneStatsByUnit[Case.unit][el] += 1;
        // console.log("已有此統計項目");
      } else {
        result.onSceneStatsByUnit[Case.unit][el] = 1;
        // console.log("尚未有此統計項目");
      }
    });
  });

  Object.values(result.onSceneStatsByUnit).forEach((unit) => {
    // console.log(Object.entries(unit), "this is units");
    Object.entries(unit).forEach((scene) => {
      if (scene[0] in result.onSceneStatsAll) {
        result.onSceneStatsAll[scene[0]] += scene[1];
      } else {
        result.onSceneStatsAll[scene[0]] = scene[1];
      }
    });
  });
  return result;
};

const treatmentStats = (Cases) => {
  let result = {
    treatmentStatsAll: {},
    treatmentStatsByUnit: {},
  };
  result.treatmentStatsByUnit = {};
  Cases.forEach((Case) => {
    if (Case.unit in result.treatmentStatsByUnit) {
      // console.log("此分隊已造冊");
    } else {
      result.treatmentStatsByUnit[Case.unit] = {};
      // console.log("此分隊未造冊");
    }
    Case.treatment.forEach((el) => {
      if (el in result.treatmentStatsByUnit[Case.unit]) {
        result.treatmentStatsByUnit[Case.unit][el] += 1;
        // console.log("已有此統計項目");
      } else {
        result.treatmentStatsByUnit[Case.unit][el] = 1;
        // console.log("尚未有此統計項目");
      }
    });
  });

  Object.values(result.treatmentStatsByUnit).forEach((unit) => {
    // console.log(Object.entries(unit), "this is units");
    Object.entries(unit).forEach((scene) => {
      if (scene[0] in result.treatmentStatsAll) {
        result.treatmentStatsAll[scene[0]] += scene[1];
      } else {
        result.treatmentStatsAll[scene[0]] = scene[1];
      }
    });
  });
  return result;
};

// dashboard

// get data
exports.getReports = functions
  .region("asia-east1")
  .https.onCall(async (data, context) => {
    if (!context.auth) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError(
        "failed-precondition",
        "The function must be called " + "while authenticated."
      );
    } else {
      const { unit } = data;
      // const unitId = await getCollectionId(unit);
      // console.log(unit + "/" + "unitFolder" + "/unitStats");
      const unitRefs = db.collection(unit + "/" + "unitFolder" + "/unitStats");
      const weekReportSnapshot = await allStatsRef
        .doc("week")
        .collection("weekCollection")
        .orderBy("time", "desc")
        .limit(1)
        .get();
      let weekData = weekReportSnapshot.docs.map((doc) => ({
        ...doc.data(),
      }))[0];
      const monthReportSnapshot = await allStatsRef
        .doc("month")
        .collection("monthCollection")
        .orderBy("time", "desc")
        .limit(1)
        .get();
      let monthData = monthReportSnapshot.docs.map((doc) => ({
        ...doc.data(),
      }))[0];
      const twoMonthReportSnapshot = await allStatsRef
        .doc("twoMonth")
        .collection("twoMonthCollection")
        .orderBy("time", "desc")
        .limit(1)
        .get();
      let twoMonthData = twoMonthReportSnapshot.docs.map((doc) => ({
        ...doc.data(),
      }))[0];

      const unitWeekReportSnapshot = await unitRefs
        .doc("unitStatsCollection")
        .collection("week")
        .orderBy("time", "desc")
        .limit(1)
        .get();
      let unitWeekData = unitWeekReportSnapshot.docs.map((doc) => ({
        ...doc.data(),
      }))[0];

      const unitMonthReportSnapshot = await unitRefs
        .doc("unitStatsCollection")
        .collection("month")
        .orderBy("time", "desc")
        .limit(1)
        .get();
      let unitMonthData = unitMonthReportSnapshot.docs.map((doc) => ({
        ...doc.data(),
      }))[0];
      const unit2MonthReportSnapshot = await unitRefs
        .doc("unitStatsCollection")
        .collection("twoMonth")
        .orderBy("time", "desc")
        .limit(1)
        .get();
      let unit2MonthData = unit2MonthReportSnapshot.docs.map((doc) => ({
        ...doc.data(),
      }))[0];
      return {
        weekReport: { ...weekData },
        monthReport: { ...monthData },
        twoMonthReport: { ...twoMonthData },
        unitData: {
          week: unitWeekData,
          month: unitMonthData,
          twoMonth: unit2MonthData,
        },
      };
    }
  });

// per week
exports.weekReport = functions.pubsub
  .schedule("0 0 * * 7")
  // .schedule("every 3 minutes")
  .timeZone("Asia/Taipei")
  .onRun(async (context) => {
    const now = new Date();
    const weekAgoTimeStamp = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7,
      now.getHours(),
      now.getMinutes()
    );

    const query = await casesRef
      .orderBy("time", "desc")
      .where("time", ">=", weekAgoTimeStamp.toISOString().split(".")[0])
      .get();
    const pool = query.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("weekAgoTimeStamp", weekAgoTimeStamp);
    const MissionStatsResult = missionStatsByPersonal(pool);
    const OnSceneStatsResult = onSceneStats(pool);
    const treatmentStatsResult = treatmentStats(pool);

    const AllStatsData = {
      time: now,
      onSceneStatsAll: OnSceneStatsResult.onSceneStatsAll,
      treatmentStatsAll: treatmentStatsResult.treatmentStatsAll,
      missionStatsByAllPersonal: MissionStatsResult.missionStatsByAllPersonal,
      missionStatsByAllUnit: MissionStatsResult.missionStatsByAllUnit,
    };
    allStatsRef.doc("week").collection("weekCollection").add(AllStatsData);

    for (const unit in MissionStatsResult.missionStatsByUnitPersonal) {
      const UnitStatsData = {
        time: now,
        missionStatsByUnitPersonal:
          MissionStatsResult.missionStatsByUnitPersonal[unit],
        treatmentStatsByUnit: treatmentStatsResult.treatmentStatsByUnit[unit],
        onSceneStatsByUnit: OnSceneStatsResult.onSceneStatsByUnit[unit],
      };
      const unitEngName = unitNameEnum[unit];
      // const unitId = await getCollectionId(unitEngName);
      db.collection(unitEngName + "/" + "unitFolder" + "/unitStats")
        .doc("unitStatsCollection")
        .collection("week")
        .add(UnitStatsData)
        .then(console.log("success run weekReport"));
    }
  });

exports.monthReport = functions.pubsub
  .schedule("0 0 1 * *")
  .timeZone("Asia/Taipei")
  .onRun(async (context) => {
    const now = new Date();
    const monthAgoTimeStamp = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate(),
      now.getHours(),
      now.getMinutes()
    );

    const query = await casesRef
      .orderBy("time", "desc")
      .where("time", ">=", monthAgoTimeStamp.toISOString().split(".")[0])
      .get();
    const pool = query.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("monthAgoTimeStamp", monthAgoTimeStamp);
    const MissionStatsResult = missionStatsByPersonal(pool);
    const OnSceneStatsResult = onSceneStats(pool);
    const treatmentStatsResult = treatmentStats(pool);

    const AllStatsData = {
      time: now,
      onSceneStatsAll: OnSceneStatsResult.onSceneStatsAll,
      treatmentStatsAll: treatmentStatsResult.treatmentStatsAll,
      missionStatsByAllPersonal: MissionStatsResult.missionStatsByAllPersonal,
      missionStatsByAllUnit: MissionStatsResult.missionStatsByAllUnit,
    };
    allStatsRef.doc("month").collection("monthCollection").add(AllStatsData);

    for (const unit in MissionStatsResult.missionStatsByUnitPersonal) {
      const UnitStatsData = {
        time: now,
        missionStatsByUnitPersonal:
          MissionStatsResult.missionStatsByUnitPersonal[unit],
        treatmentStatsByUnit: treatmentStatsResult.treatmentStatsByUnit[unit],
        onSceneStatsByUnit: OnSceneStatsResult.onSceneStatsByUnit[unit],
      };
      const unitEngName = unitNameEnum[unit];
      // const unitId = await getCollectionId(unitEngName);
      db.collection(unitEngName + "/" + "unitFolder" + "/unitStats")
        .doc("unitStatsCollection")
        .collection("month")
        .add(UnitStatsData)
        .then(console.log("success run monthReport"));
    }
  });

exports.twoMonthReport = functions.pubsub
  .schedule("0 0 1 */2 *")
  .timeZone("Asia/Taipei")
  .onRun(async (context) => {
    const now = new Date();
    const twoMonthAgoTimeStamp = new Date(
      now.getFullYear(),
      now.getMonth() - 2,
      now.getDate(),
      now.getHours(),
      now.getMinutes()
    );

    const query = await casesRef
      .orderBy("time", "desc")
      .where("time", ">=", twoMonthAgoTimeStamp.toISOString().split(".")[0])
      .get();
    const pool = query.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("twoMonthAgoTimeStamp", twoMonthAgoTimeStamp);
    const MissionStatsResult = missionStatsByPersonal(pool);
    const OnSceneStatsResult = onSceneStats(pool);
    const treatmentStatsResult = treatmentStats(pool);

    const AllStatsData = {
      time: now,
      onSceneStatsAll: OnSceneStatsResult.onSceneStatsAll,
      treatmentStatsAll: treatmentStatsResult.treatmentStatsAll,
      missionStatsByAllPersonal: MissionStatsResult.missionStatsByAllPersonal,
      missionStatsByAllUnit: MissionStatsResult.missionStatsByAllUnit,
    };
    allStatsRef
      .doc("twoMonth")
      .collection("twoMonthCollection")
      .add(AllStatsData);

    for (const unit in MissionStatsResult.missionStatsByUnitPersonal) {
      const UnitStatsData = {
        time: now,
        missionStatsByUnitPersonal:
          MissionStatsResult.missionStatsByUnitPersonal[unit],
        treatmentStatsByUnit: treatmentStatsResult.treatmentStatsByUnit[unit],
        onSceneStatsByUnit: OnSceneStatsResult.onSceneStatsByUnit[unit],
      };
      const unitEngName = unitNameEnum[unit];

      db.collection(unitEngName + "/" + "unitFolder" + "/unitStats")
        .doc("unitStatsCollection")
        .collection("twoMonth")
        .add(UnitStatsData)
        .then(console.log("success run twoMonthReport"));
    }
  });
