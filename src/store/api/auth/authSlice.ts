import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "./types";

const initialState: AuthState = {
  token: null,
  user: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      state.token = action.payload.token;

      state.user = action.payload.user;
      AsyncStorage.setItem(
        "auth",
        JSON.stringify({
          token: state.token,
          user: state.user,
        })
      ).catch((err) => {
        console.warn("Failed to persist auth:", err);
      });
    },

    logout: (state) => {
      state.token = null;
      state.user = null;

      AsyncStorage.removeItem("auth").catch((err) => {
        console.warn("Failed to clear auth:", err);
      });
    },

    setFromStorage: (
      state,
      action: PayloadAction<{ token: string; user: User } | null>
    ) => {
      if (action.payload) {
        state.token = action.payload.token;
        state.user = action.payload.user;
      }
      state.isInitialized = true;
    },
  },
});

export const { setCredentials, logout, setFromStorage } = authSlice.actions;
export default authSlice.reducer;
