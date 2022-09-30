const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
exports.deleteUser = functions
  .region("asia-east1")
  .https.onCall(async (data) => {
    const { uid } = data;
    if (!uid) return { error: "Please enter an UID" };
    try {
      // return the promise from here
      console.log("cloud uid", uid);
      await admin.auth().deleteUser(uid);
      console.log("Successfully deleted user");
      return { data: "User deleted" };
    } catch (error) {
      console.log("error deleting user", error);
      return { error };
    }
  });
