import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
} as { isOpen: boolean };

const appBarSlice = createSlice({
  name: "appbar",
  initialState,
  reducers: {
    setOpenDrawer: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setOpenDrawer } = appBarSlice.actions;
export default appBarSlice.reducer;
