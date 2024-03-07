import { configureStore } from "@reduxjs/toolkit";
import userReduer from "./slices/userSlice";
import drawerReducer from "./slices/appBarSlice";
import menuReducer from "./slices/menuSlice";
import dialogReducer from "./slices/appDialogSlice";
import snackbarReducer from "./slices/appSnackbar";

export const store = configureStore({
  reducer: {
    user: userReduer,
    drawer: drawerReducer,
    menu: menuReducer,
    dialog: dialogReducer,
    snackbar: snackbarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
