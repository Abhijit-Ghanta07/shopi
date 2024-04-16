import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { DB } from "./firebase";

const collectionRef = collection(DB, "cart");

const addCartItem = async (productId, userId, quantity = 1) => {
  // add cart item to firestore
  try {
    const newDoc = await addDoc(collectionRef, {
      productId,
      userId,
      quantity,
      timestamp: serverTimestamp(),
    });
    return newDoc.id;
  } catch (err) {
    return err;
  }
};

const getCartItems = async (userID) => {
  let q = query(collectionRef, where("userId", "==", `${userID}`));
  // get cartitems by userid
  try {
    const queryResult = await getDocs(q);
    const newData = queryResult.docs.map((doc) => ({
      ...doc.data(),
      fireId: doc.id,
    }));
    return newData;
  } catch (err) {
    return err;
  }
};
const deleteCartItems = async (docID) => {
  const docRef = doc(DB, "cart", docID);
  if (docRef) {
    try {
      const product = await deleteDoc(docRef);
      return true;
    } catch (err) {
      return err;
    }
  }
};
const updateCartItems = async (docID, quantity) => {
  const docRef = doc(DB, "cart", docID);
  if (docRef) {
    try {
      const newDoc = await updateDoc(docRef, {
        quantity,
        timestamp: serverTimestamp(),
      });
      return true;
    } catch (err) {
      return err;
    }
  }
};

export { addCartItem, getCartItems, deleteCartItems, updateCartItems };
