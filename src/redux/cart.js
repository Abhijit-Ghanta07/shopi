import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { addCartItem, deleteCartItems, getCartItems } from "../utils/fireStore";

export const mapItem = createAsyncThunk("cart/mapUserCart", async (userId) => {
  try {
    const cartProducts = await getCartItems(userId);
    return cartProducts;
  } catch (err) {
    return isRejectedWithValue({ error: err.message });
  }
});
export const addItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ productId, userId }) => {
    try {
      const fireId = await addCartItem(productId, userId);
      return { productId, fireId, quantity: 1 };
    } catch (err) {
      return { error: err.message };
    }
  }
);
export const deleteItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ productId, fireId }) => {
    try {
      const res = await deleteCartItems(fireId);
      return { productId, fireId };
    } catch (err) {
      isRejectedWithValue({ error: err });
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    productsID: [],
    firestoreProducts: [],
  },
  reducers: {
    cartReset: (state) => {
      return { productsID: [], firestoreProducts: [] };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(mapItem.fulfilled, (state, action) => {
        state.productsID = action.payload.map((item) => item.productId);

        state.firestoreProducts = action.payload.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          fireId: item.fireId,
        }));
      })
      .addCase(mapItem.rejected, (state, action) => {})
      .addCase(addItem.fulfilled, (state, action) => {
        state.productsID = [action.payload.productId, ...state.productsID];
        state.firestoreProducts = [
          {
            productId: action.payload.productId,
            quantity: action.payload.quantity,
            fireId: action.payload.fireId,
          },
          ...state.firestoreProducts,
        ];
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.productsID = state.productsID.filter(
          (item) => item !== action.payload.productId
        );
        state.firestoreProducts = state.firestoreProducts.filter(
          (item) => item.fireId !== action.payload.fireId
        );
      });
  },
});

export const { cartReset } = cartSlice.actions;
export default cartSlice.reducer;
