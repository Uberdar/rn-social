import db from "../../firebase/config";
import { authSlice } from "./authReducer";

const authSignUpUser =
  ({ email, password, nickname }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);
      const user = await db.auth().currentUser;
      await user.updateProfile({
        nickname: displayName,
      });
      const { uid, displayName } = await db.auth().currentUser;
      // console.log("uid: ", uid);
      // console.log("displayName: ", displayName);
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          nickname: displayName,
        })
      );
      console.log("user: ", user);
    } catch (error) {
      console.log("error: ", error);
      console.log("error.message: ", error.message);
    }
  };

const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      console.log("user: ", user);
    } catch (error) {
      console.log("error: ", error);
      console.log("error.message: ", error.message);
    }
  };

const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(authSlice.actions.authSignOut());
};

const authStateChangeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        nickname: user.displayName,
        userId: user.uid,
      };
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};

export { authSignInUser, authSignUpUser, authSignOutUser, authStateChangeUser };
