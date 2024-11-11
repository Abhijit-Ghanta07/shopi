import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import {
  addCartItem,
  deleteCartItems,
  getCartItems,
} from "../firebase/fireStore";
import { OrderBatchDelete } from "../firebase/storeOrder";

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
export const cartReset = createAsyncThunk("cart/cartReset", async (userId) => {
  try {
    let res = await OrderBatchDelete(userId);
    return res;
  } catch (err) {
    return err;
  }
});

const initialState = {
  productsID: [],
  firestoreProducts: [],
  error: null,
  pending: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { ...initialState },
  reducers: {
    cartEmpty: (state, action) => {
      return (state = { ...initialState });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(mapItem.fulfilled, (state, action) => {
        state.productsID = action.payload.map((item) => item.productId);
        state.error = null;
        state.firestoreProducts = action.payload.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          fireId: item.fireId,
        }));
      })
      .addCase(mapItem.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.productsID = [action.payload.productId, ...state.productsID];
        state.error = null;
        state.firestoreProducts = [
          {
            productId: action.payload.productId,
            quantity: action.payload.quantity,
            fireId: action.payload.fireId,
          },
          ...state.firestoreProducts,
        ];
      })
      .addCase(addItem.rejected, (state, action) => {
        return (state.error = action.error);
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.error = null;
        state.productsID = state.productsID.filter(
          (item) => item !== action.payload.productId
        );
        state.firestoreProducts = state.firestoreProducts.filter(
          (item) => item.fireId !== action.payload.fireId
        );
      })
      .addCase(deleteItem.rejected, (state, action) => {
        return (state.error = action.error);
      })
      .addCase(cartReset.fulfilled, (state, action) => {
        state = { ...initialState };
      })
      .addCase(cartReset.rejected, (state, action) => {
        return (state.error = action.error);
      });
  },
});

export const { cartEmpty } = cartSlice.actions;

export default cartSlice.reducer;
