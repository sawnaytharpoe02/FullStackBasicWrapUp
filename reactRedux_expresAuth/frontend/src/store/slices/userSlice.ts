import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  UserSignUpParams,
  UserSignInParams,
  UserSlice,
  User,
} from "../../types/user";

const initialState: UserSlice = {
  user: null,
  isLoading: false,
  error: null,
};

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (userSignUpParams: UserSignUpParams) => {
    const { email, password } = userSignUpParams;
    try {
      await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      userSignUpParams.onSuccess && userSignUpParams.onSuccess();
    } catch (error) {
      console.log(error);
    }
  }
);

export const signInUser = createAsyncThunk(
  "/user/signInUser",
  async (userSignInParams: UserSignInParams) => {
    const { email, password } = userSignInParams;
    try {
      const res = await fetch("http://localhost:8000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const { accessToken } = await res.json();
      localStorage.setItem("accessToken", accessToken);
      userSignInParams.onSuccess && userSignInParams.onSuccess();
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
