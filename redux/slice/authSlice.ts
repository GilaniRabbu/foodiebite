/*eslint-disable*/
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthState = {
  user: {
    _id?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    profilePicture?: {
      url: string;
      altText: string;
    };
    [key: string]: any;
  } | null;
};

// `user: null` means "not logged in". It is replaced by the server's user
// object on login (see components/auth/LoginForm.tsx) and reset on logout.
const initialState: TAuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: {
          _id?: string;
          phone?: string;
          firstName?: string;
          lastName?: string;
          isPhoneVerified?: boolean;
          isRegistered?: boolean;
          profilePicture?: {
            url: string;
            altText: string;
          };
          role?: string; // ✅ Also added to payload type
          isOpenJoinUs?: boolean;
          isOpenSelectArea?: boolean;
          isOpenSelectServices?: boolean;
          [key: string]: any;
        };
      }>
    ) => {
      const { user } = action.payload;
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout, removeUser } = authSlice.actions;

export default authSlice.reducer;

// Selectors

export const selectCurrentUser = (state: { auth: TAuthState }) =>
  state.auth.user;

// ✅ Optional: Selector to get role
export const selectUserRole = (state: { auth: TAuthState }) =>
  state.auth.user?.role || null;
