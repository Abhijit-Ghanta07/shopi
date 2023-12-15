import React from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { DB } from "./firebase";
const addDocFireStore = async (productId, userId) => {
  // add cart item to firestore
  try {
    const result = await addDoc(collection(DB, "cart"), {
      userId,
      productId,
    });
  } catch (err) {
    console.log(err);
  }
};

const getInitialCartItems = async (id) => {
  let collectionRef = collection(DB, "cart");
  let q = query(collectionRef, where("userId", "==", `${id}`));
  // get cartitems by userid
  try {
    const result = await getDocs(q);
    const newData = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return newData;
  } catch (err) {
    console.log(err);
  }
};
const deleteFromFireStore = async (productId, userId = "") => {
  if (userId !== "") {
    let collectionRef = collection(DB, "cart");
    let ref = query(
      collectionRef,
      where("userId", "==", `${userId}`),
      where("productId", "==", `${productId}`)
    );
    try {
      const product = await getDocs(ref);
      console.log(product);
    } catch (err) {
      console.log(err);
    }
  }
};

export { addDocFireStore, getInitialCartItems, deleteFromFireStore };
