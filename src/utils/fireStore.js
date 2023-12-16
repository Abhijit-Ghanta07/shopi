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
const addCartItem = async (productId, userId, quntity = 1) => {
  // add cart item to firestore
  const DocRef = collection(DB, "cart");
  try {
    const newDoc = await addDoc(DocRef, {
      productId,
      userId,
      quntity,
      timestamp: serverTimestamp(),
    });
    return newDoc.id;
  } catch (err) {
    console.log(err);
  }
};

const getCartItems = async (userID) => {
  let collectionRef = collection(DB, "cart");
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
    console.log(err);
  }
};
const deleteCartItems = async (docID) => {
  const docRef = doc(DB, "cart", docID);
  if (docRef) {
    try {
      const product = await deleteDoc(docRef);
    } catch (err) {
      console.log(err);
    }
  }
};
const updateCartItems = async (docID, quntity) => {
  const docRef = doc(DB, "cart", docID);
  if (docRef) {
    try {
      const newDoc = await updateDoc(docRef, {
        quntity,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  }
};

export { addCartItem, getCartItems, deleteCartItems, updateCartItems };
