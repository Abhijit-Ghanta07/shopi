import { addCartItem } from "../utils/fireStore.js";

function CartReducer(state, action) {
  const { productId, quntity, userId, fireId } = action;
  switch (action.type) {
    case "addToCart":
      return addCartItem(productId, userId, quntity).then((id) => {
        return {
          productsID: [...state.productID, productId],
          firestoreProducts: [
            ...state.firestoreProducts,
            { productId, quntity, fireId: id },
          ],
        };
      });

    case "mapCart":
      return {
        productsID: [...state.productID, productId],
        firestoreProducts: [
          ...state.firestoreProducts,
          { productId, quntity, fireId },
        ],
      };
    case "deleteFromCart":
      let fillterItems = state.productID.filter(
        (item) => item !== action.productId
      );
      return { productsID: fillterItems, ...state };

    case "deleteFromFire":
      let { fireId } = action;
      let fillterProducts = state.firestoreProducts.filter(
        (item) => item.fireId !== fireId
      );
      return { ...state, firestoreProducts: fillterProducts };

    case "cartReset":
      return [];

    default:
      return state;
  }
}

export default CartReducer;
