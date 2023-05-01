import React, { useState } from "react";
import { getAuth, onAuthStateChanged, Auth, User } from "firebase/auth";
//import firebase from "../../config/firebase";
import { auth } from "../../config/firebase";
import * as SecureStore from "expo-secure-store";

//const auth = getAuth();
//auth.setPersistence();
//auth.Auth.Persistence.LOCAL;

export function useAuthentication() {
  const [user, setUser] = React.useState<User>();
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        async function save(key, value) {
          await SecureStore.setItemAsync(key, value.uid);
        }
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        save("userId", user);
        setUser(user);
        //console.log(`user is logged in with email ${user.email}`);
      } else {
        // User is signed out
        //console.log("user is not logged");
        setUser(undefined);
      }
      setIsLoaded(true);
      //console.log(`isLoaded set true`);
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user,
    isLoaded,
  };
}
