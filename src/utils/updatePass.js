import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

async function updatePass(user, OldPass, Newpass) {
  const credential = EmailAuthProvider.credential(user.email, OldPass);
  try {
    // authenticate user
    await reauthenticateWithCredential(user, credential);

    // then update the password
    await updatePassword(user, Newpass);

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export { updatePass };
