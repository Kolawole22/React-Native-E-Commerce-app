// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import "firebase/auth";
import Constants from "expo-constants";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import { getFirestore, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
  measuringId: Constants.manifest?.extra?.firebaseMeasuringId,
};
//console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
// //const analytics = getAnalytics(app);
//const db = getFirestore(app);
//console.log(db);
//firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
//const db = firebase.firestore();

// try {
//   const docRef = addDoc(collection(db, "001"), {
//     id: "15194-old-honey-barn-mint-julep-mixer-200ml",
//     img: "https://goldbelly.imgix.net/uploads/product_image/image/950/old-honey-barn-mint-julep-mixer-200ml.e0b131d6d9b69963706b43fd4334ab74.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1",
//     name: "Old Honey Barn Mint Julep",
//     dsc: "Old Honey Barn Mint Julep Mixer",
//     price: 25,
//     rate: 5,
//     country: "Louisville, KY",
//     category: "drink",
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// items.forEach(async (item) => {
//   await addDoc(collection(db, "items"), item);
//   //console.log(`${menuItem.name} added to menu`);
// });

//import { doc, getDoc } from "firebase/firestore";

import { collection, query, where, getDocs } from "firebase/firestore";

const menuRef = collection(db, "items");

// Create a query to get all documents in the "menu" collection
const allMenuDocs = query(menuRef);

// async function updateMenu() {
//   const snapshot = await getDocs(allMenuDocs);
//   snapshot.forEach((docRef) => {
//     const currentPrice = docRef.data().price;
//     const updatedPrice = currentPrice * 500;
//     updateDoc(docRef.ref, { price: updatedPrice });
//     console.log("menuItems updated");
//   });
// }
//updateMenu();

export default app;
