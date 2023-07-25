import { OrderProps } from "../screens/Orders";
const { createSlice, PayloadAction } = require("@reduxjs/toolkit");

interface OrdersState {
  Orders: OrderProps[];
}

const initialState: OrdersState = {
  Orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state: any, action: typeof PayloadAction) => {
      const updatedOrders = action?.payload;
      state.Orders = updatedOrders;
    },
  },
});

export const { setOrders } = ordersSlice.actions;
export const orderReducer = ordersSlice?.reducer;
