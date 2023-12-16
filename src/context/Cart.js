import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productsID: [],
    firestoreProducts: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.productsID = [action.payload.productId, ...state.productsID];
      state.firestoreProducts = [
        {
          productId: action.payload.productId,
          quantity: action.payload.quantity,
          fireId: action.payload.fireId,
        },
        ...state.firestoreProducts,
      ];
    },
    mapCart: (state, action) => {
      state.productsID = [action.payload.productId, ...state.productsID];
      state.firestoreProducts = [
        {
          productId: action.payload.productId,
          quantity: action.payload.quantity,
          fireId: action.payload.fireId,
        },
        ...state.firestoreProducts,
      ];
    },
    deleteProduct: (state, action) => {
      state.productsID = state.productsID.filter(
        (item) => item !== action.payload
      );
    },
    deleteFromFire: (state, action) => {
      state.firestoreProducts = state.firestoreProducts.filter(
        (item) => item.fireId !== action.payload
      );
    },
    cartReset: (state) => {
      return { productsID: [], firestoreProducts: [] };
    },
  },
});

export const { addProduct, mapCart, deleteProduct, deleteFromFire, cartReset } =
  cartSlice.actions;
export default cartSlice.reducer;
