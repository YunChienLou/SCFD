const functions = require("firebase-functions");
const admin = require("firebase-admin");

const serviceAccount = require("./apiKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const usersRef = db.collection("users");

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
      const { uid } = data;
      if (!uid) return { error: "Please enter an UID" };
      try {
        // return the promise from here
        console.log("cloud uid", uid);
        await admin.auth().deleteUser(uid);
        return { data: "User deleted" };
      } catch (error) {
        throw new functions.https.HttpsError("failed-execute", error);
      }
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
      const { token, userData, userId } = data;
      admin
        .auth()
        .verifyIdToken(token)
        .then((claims) => {
          if (claims.isAdmin === true) {
            return usersRef.doc(userId).update(userData);
          } else {
            throw new functions.https.HttpsError("failed-execute", error);
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
      .then((claims) => {
        if (claims.isAdmin === true) {
          return {
            result: true,
            msg: "success verify user: " + context.auth.uid,
          };
        } else {
          return {
            result: false,
            msg: "Fail to verify Admin",
          };
        }
      })
      .catch((error) => {
        throw new functions.https.HttpsError("failed-execute", error);
      });
  });
