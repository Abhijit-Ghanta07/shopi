import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { DB } from "./firebase";
const collectionRef = collection(DB, "orders");

const addOrder = async (userId, products = [], price) => {
  try {
    const newOrder = await addDoc(collectionRef, {
      userId,
      products,
      price,
      timestamp: serverTimestamp(),
    });
    return newOrder;
  } catch (err) {
    return err;
  }
};
const getOrders = async (userId) => {
  let q = query(collectionRef, where("userId", "==", `${userId}`));

  try {
    const queryResult = await getDocs(q);
    const newData = queryResult.docs.map((doc) => ({
      ...doc.data(),
    }));
    return newData;
  } catch (err) {
    console.log(err);
  }
};
const OrderBatchDelete = async (userId) => {
  const collecRef = collection(DB, "cart");
  const q = query(collecRef, where("userId", "==", `${userId}`));
  const docs = await getDocs(q);

  if (docs) {
    docs.forEach(async (doc) => {
      try {
        let res = await deleteDoc(doc.ref);
        return true;
      } catch (err) {
        return err;
      }
    });
  }
};

export { addOrder, getOrders, OrderBatchDelete };
