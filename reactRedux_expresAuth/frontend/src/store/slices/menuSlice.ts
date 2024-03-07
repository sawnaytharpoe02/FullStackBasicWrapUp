import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MenuSlice, CreateMenuParams } from "../../types/menu";

const initialState: MenuSlice = {
  menus: [],
  isLoading: false,
  isError: null,
};

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (menu: CreateMenuParams) => {
    try {
      const { name, price } = menu;
      await fetch("http://localhost:8000/menus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price }),
      });

      menu.onSuccess && menu.onSuccess();
    } catch (error) {
      console.log(error);
    }
  }
);

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state, _action) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(createMenu.fulfilled, (state, _action) => {
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(createMenu.rejected, (state, _action) => {
        state.isLoading = false;
        const error = new Error("Create menu error occured");
        state.isError = error.message;
      });
  },
});

export default menuSlice.reducer;
